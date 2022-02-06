import sys
# city = "Київ"
city = sys.argv[4]
name = sys.argv[2]
email = sys.argv[3]

print("Що ти вмієш?")
# skillsInput = input("Введи свої навички через кому: ")
# # todo:  input validation
# skills = skillsInput.split(",")
skills = sys.argv[1].split(",")
skillsNoSpace = []
for skill in skills:
    # skill=skill.strip()
    skillsNoSpace.append(skill.strip())
    # while (skill[0] == " "):
    #     print("!")
    #     skillsNoSpace.append(skill.strip())
    # print(skill)
print("Initial input ", skillsNoSpace)


#write data into csv-db  

import csv  
import pandas as pd
try:
    with open('./db/skills.csv') as f:
        # Do something with the file
        try:
            with open('./db/skills.csv', 'a+') as f:
                # f.write(skills[0])
                
                # Do something with the file
                # create the csv writer
                writer = csv.writer(f)
                # write a row to the csv file
                for idx, skill in enumerate(skillsNoSpace):
                    csvRows = len(pd.read_csv('./db/skills.csv'))
                    print(csvRows, idx)
                    writer.writerow([csvRows + idx, skill, name, city, email])
                print(f.readlines())
        except IOError:
                print("Error")
except IOError:
    print("File not accessible,  creation")
    try:
        with open('./db/skills.csv', 'a+') as f:
            # create the csv writer
            writer = csv.writer(f)
            # write a row to the csv file
            writer.writerow(['skillId', 'skill', 'user', 'location', 'email'])
            for idx, skill in enumerate(skillsNoSpace):
                    writer.writerow([idx, skill, name, city, email])
            print(f.readlines())
            # Do something with the file
    except IOError:
        print("Error")



