import pandas as pd

filenames = ["NCP_EmigrRatioD{}.xlsx".format(i) for i in ["","1","2","3","4"]]

data = dict()

for filename in filenames:
    data[filename] = pd.read_excel(filename)
    data[filename].columns =["统计日期","迁出地区","迁出地区代码","隶属省份","迁出目的地","迁出目的地代码","迁出人口比例"]
    data[filename].drop([0,1],inplace=True)
    data[filename].drop(columns=['迁出地区代码','隶属省份','迁出目的地代码'],inplace=True)
    data[filename]['统计日期'] = pd.to_datetime(data[filename]['统计日期'])
    data[filename]['统计日期'] = data[filename]['统计日期'].dt.date
    data[filename].sort_values(['统计日期','迁出地区','迁出人口比例'],ascending=[True,True,False],inplace=True)
    data[filename] = data[filename][~data[filename]['迁出目的地'].str.contains("省")]
    data[filename] = data[filename].groupby(['统计日期','迁出地区']).head(5)
    print(filename + " done")

result = pd.concat(data.values())
result.to_json("cleaned/emigrate.json",index=False)
print("succeed!")


filenames = ["NCP_ImmigrRatioD{}.xlsx".format(i) for i in ["","1","2","3","4","5"]]

data = dict()

for filename in filenames:
    data[filename] = pd.read_excel(filename)
    data[filename].columns =["统计日期","迁入地区","迁入地区代码","隶属省份","迁入来源地","迁入来源地代码","迁入来源地隶属省份","迁入人口比例"]
    data[filename].drop([0,1],inplace=True)
    data[filename].drop(columns=['迁入地区代码','隶属省份','迁入来源地代码',"迁入来源地隶属省份"],inplace=True)
    data[filename]['统计日期'] = pd.to_datetime(data[filename]['统计日期'])
    data[filename]['统计日期'] = data[filename]['统计日期'].dt.date
    data[filename].sort_values(['统计日期','迁入地区','迁入人口比例'],ascending=[True,True,False],inplace=True)
    data[filename] = data[filename][~data[filename]['迁入来源地'].str.contains("省")]
    data[filename] = data[filename].groupby(['统计日期','迁入地区']).head(5)
    print(filename + " done")

result = pd.concat(data.values())
result.to_excel("cleaned/immigrate.json",index=False)
result.reset_index(inplace=True)
result.to_json("cleaned/emigrate.json")
print("succeed!")