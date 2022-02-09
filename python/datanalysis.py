import pandas as pd
import matplotlib.pyplot as plt

skillsData = pd.read_csv("./db/skills.csv")
# print(skillsData)
allSkills = skillsData['skill']
uniqueSkills = pd.unique(skillsData['skill'])
uniqueUsers = pd.unique(skillsData['user'])
# print("Знайдено ", len(uniqueSkills), " унікальних навичок: ", uniqueSkills)

skills_count = skillsData.groupby('skill')['skillId'].count()
combined = skills_count.to_json(force_ascii=False, orient='table')[:-1]
combined += ',"totalSkills" : ' + str(len(uniqueSkills)) + ','
combined += '"totalUsers" : ' + str(len(uniqueUsers)) + '}'
# combined = combined.encode()
# combined = combined
print(str(combined))
# print(skills_count.to_json(force_ascii=False, orient='table'))

# #viz

# skills_count.plot(kind='pie')
# plt.show()
