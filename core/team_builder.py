import pandas as pd
import config

def build_teams(df, tech_sim_df, social_diff_df, team_size):
    """
    Kullanıcıları verilen takım boyutuna (team_size) göre en uygun şekilde gruplara ayırır.
    Greedy (Açgözlü) bir algoritma kullanılarak takımlar oluşturulur.
    """
    unassigned_users = list(df.index)
    teams = []
    
    while len(unassigned_users) > 0:
        if len(unassigned_users) < team_size:
            # Geriye kalan kişiler varsa onları son takıma ekle veya eksik bir takım oluştur
            team = unassigned_users[:]
            teams.append(team)
            break
            
        # Yeni bir takım başlat (Listeden ilk kişiyi al)
        current_team = [unassigned_users.pop(0)]
        
        # Takımı doldurana kadar devam et
        while len(current_team) < team_size and len(unassigned_users) > 0:
            best_candidate = None
            best_score = -9999
            
            for candidate in unassigned_users:
                # Adayın, şu anki takımdaki tüm üyelere olan uyum skorunun ortalamasını hesapla
                total_score = 0
                for member in current_team:
                    tech_score = tech_sim_df.loc[member, candidate]
                    social_diff = social_diff_df.loc[member, candidate]
                    
                    member_cluster = df.loc[member, 'social_cluster']
                    cand_cluster = df.loc[candidate, 'social_cluster']
                    
                    ideal_partners = config.COMPATIBILITY_MATRIX.get(member_cluster, [])
                    cluster_bonus = 0
                    if cand_cluster in ideal_partners:
                        cluster_bonus = config.CLUSTER_BONUS_PERFECT
                    elif member_cluster != cand_cluster:
                        cluster_bonus = config.CLUSTER_BONUS_DIFF
                        
                    score = (tech_score * config.WEIGHT_TECH) + (social_diff * config.WEIGHT_SOCIAL) + cluster_bonus
                    total_score += score
                    
                avg_score = total_score / len(current_team)
                
                if avg_score > best_score:
                    best_score = avg_score
                    best_candidate = candidate
                    
            # En iyi adayı takıma ekle
            current_team.append(best_candidate)
            unassigned_users.remove(best_candidate)
            
        teams.append(current_team)
        
    # Takım sonuçlarını formatla
    formatted_teams = []
    for i, team in enumerate(teams):
        team_members = []
        for member_id in team:
            member_cluster = df.loc[member_id, 'social_cluster']
            team_members.append({
                "id": str(member_id),
                "cluster": member_cluster
            })
        formatted_teams.append({
            "team_id": i + 1,
            "members": team_members
        })
        
    return formatted_teams
