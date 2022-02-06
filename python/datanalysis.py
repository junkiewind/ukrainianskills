import pandas as pd
import matplotlib.pyplot as plt

skillsData = pd.read_csv("./db/skills.csv")
# print(skillsData)
allSkills = skillsData['skill']
uniqueSkills = pd.unique(skillsData['skill'])
# print("Знайдено ", len(uniqueSkills), " унікальних навичок: ", uniqueSkills)

skills_count = skillsData.groupby('skill')['skillId'].count()
print(skills_count.to_json(force_ascii=False, orient='table'))

# #viz

# skills_count.plot(kind='pie')
# plt.show()