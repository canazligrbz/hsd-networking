import pandas as pd
import random
import config

def run_matching_logic(df, tech_sim_df, social_diff_df):
    """
    Toplu işlem (Batch) için akış sıralaması hesaplar.
    """
    print("Akış sıralaması hesaplanıyor (Feed Mode)...")

    usage_counts = {idx: 0 for idx in df.index}
    long_format_results = []

    user_indices = list(df.index)
    random.shuffle(user_indices)

    for user_id in user_indices:
        user_cluster = df.loc[user_id, 'social_cluster']
        candidates = []

        # İdeal partner listesini config'den çek
        ideal_partners = config.COMPATIBILITY_MATRIX.get(user_cluster, [])

        for candidate_id in df.index:
            if user_id == candidate_id: continue

            tech_score = tech_sim_df.loc[user_id, candidate_id]

            # (A) ÇÖP ELEME: Çok düşük teknik uyum varsa alma
            if tech_score < config.MIN_TECH_THRESHOLD:
                continue

            social_diff = social_diff_df.loc[user_id, candidate_id]
            cand_cluster = df.loc[candidate_id, 'social_cluster']

            # --- STRATEJİK BONUS ---
            cluster_bonus = 0
            if cand_cluster in ideal_partners:
                cluster_bonus = config.CLUSTER_BONUS_PERFECT  # +0.30
            elif user_cluster != cand_cluster:
                cluster_bonus = config.CLUSTER_BONUS_DIFF  # +0.10

            # Ceza
            penalty = usage_counts[candidate_id] * config.USAGE_PENALTY

            # Puanlama
            base_score = (tech_score * config.WEIGHT_TECH) + (social_diff * config.WEIGHT_SOCIAL)
            sort_score = base_score + cluster_bonus - penalty

            candidates.append({
                'target_id': candidate_id,
                'target_cluster': cand_cluster,
                'tech_score': tech_score,
                'final_score': base_score,
                'sort_score': sort_score
            })

        # Sırala
        candidates.sort(key=lambda x: x['sort_score'], reverse=True)

        # Listeye Ekle
        for rank, cand in enumerate(candidates):
            if rank >= config.MAX_FEED_LENGTH: break

            long_format_results.append({
                'Kullanıcı_ID': user_id,
                'Önerilen_ID': cand['target_id'],
                'Sıralama': rank + 1,
                'Uyum_Puanı': round(cand['final_score'], 3),
                'Teknik_Uyum': round(cand['tech_score'], 3),
                'Küme': cand['target_cluster']
            })
            usage_counts[cand['target_id']] += 1

    results_df = pd.DataFrame(long_format_results)
    results_df = results_df.sort_values(by=['Kullanıcı_ID', 'Sıralama'])
    return results_df


def recommend_for_new_user(new_user_data, df_pool, tech_sim_df, social_diff_df):
    """
    CANLI MOD: Yeni gelen TEK kullanıcı için öneri üretir.
    """
    user_id = new_user_data['id']
    user_cluster = new_user_data['cluster']

    candidates = []
    backup_candidates = []

    # İdeal partner listesi
    ideal_partners = config.COMPATIBILITY_MATRIX.get(user_cluster, [])

    for candidate_id in df_pool.index:
        if candidate_id == user_id: continue

        tech_score = tech_sim_df.loc[user_id, candidate_id]
        social_diff = social_diff_df.loc[user_id, candidate_id]
        cand_cluster = df_pool.loc[candidate_id, 'social_cluster']

        # --- STRATEJİK BONUS ---
        cluster_bonus = 0
        if cand_cluster in ideal_partners:
            cluster_bonus = config.CLUSTER_BONUS_PERFECT
        elif user_cluster != cand_cluster:
            cluster_bonus = config.CLUSTER_BONUS_DIFF

        base_score = (tech_score * config.WEIGHT_TECH) + (social_diff * config.WEIGHT_SOCIAL)
        final_score = base_score + cluster_bonus

        candidate_obj = {
            'user_id': candidate_id,
            'score': final_score,
            'tech': tech_score,
            'cluster': cand_cluster
        }

        # Baraj Kontrolü
        if tech_score >= config.MIN_TECH_THRESHOLD:
            candidates.append(candidate_obj)
        else:
            candidate_obj['score'] *= 0.8  # Cezalı puan
            backup_candidates.append(candidate_obj)

    # Sırala
    candidates.sort(key=lambda x: x['score'], reverse=True)

    # --- ACİL DURUM PLANI ---
    if len(candidates) < config.MAX_FEED_LENGTH:
        needed = config.MAX_FEED_LENGTH - len(candidates)
        backup_candidates.sort(key=lambda x: x['score'], reverse=True)
        candidates.extend(backup_candidates[:needed])

    return candidates[:config.MAX_FEED_LENGTH]