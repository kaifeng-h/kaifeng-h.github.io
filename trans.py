import os

def xiaowang(x):
    if x == "dahuang":
        print("爱你哦～")
    else:
        print("win nio~")

    import sqlite3

    conn = sqlite3.connect('./src/info.sqlite')
    c = conn.cursor()
    cursor = c.execute('select * from pubs order by "order" desc;')
    s = ''
    for data in cursor:
        title = data[1]
        author = data[3]
        aus = author.split(';')
        newAus = ''
        for au in aus:
            if au == '':
                continue
            if not ' ' in au:
                newAus =  newAus + ' ' + au +','
                continue
            auss = au.strip(' ').split(',')
            auss2 = auss[1].strip(' ') +" "+ auss[0].strip(' ')
            newAus =  newAus + ' ' + auss2 +','
        author = newAus.replace('Kaifeng Huang','<u>Kaifeng Huang</u>')
        author = author.replace('黄凯锋','<u>黄凯锋</u>')
        corresponding = data[4]
        for correspond_author in corresponding.split(';'):
            if correspond_author == '':
                continue
            correspond_authors_name_a_b = correspond_author.strip(';').split(',')
            if len(correspond_authors_name_a_b) == 1:
                correspond_authors_name_b_a_new_format = correspond_authors_name_a_b[0]
            else:
                correspond_authors_name_b_a_new_format = correspond_authors_name_a_b[1].strip(' ') +" "+ correspond_authors_name_a_b[0].strip(' ')
            # author = 
            # author = author.replace(correspond_authors_name_b_a_new_format,correspond_authors_name_b_a_new_format +"*")
            author = author[0:-1]
        year = data[5]
        acroym = data[18]
        loc = data[21]
        page = data[9]
        if page == None:
            page = 'to appear'
        source = data[17]
        conforj = data[16]
        if conforj == 'J':
            loc = ''
        else:
            loc = loc +','
        template = f'<li><p><b><font size="3" color="#0b5394">[{acroym}]</font></b> <strong>{title}.</strong><br>{author}.<em>&nbsp;{source}, {loc} {page}, {year}.</em></p></li>'
        s = s + template + '\n'
    with open('index_template.html','r') as f:
        content = f.read()
    with open('index.html','w') as f:
        # newContent = content % "aaa"
        newContent = content.replace("PUBLICATION__CONTENT", s) 
        # % s
        f.write(newContent)

    conn.close()

if __name__ == "__main__":
    xiaowang("dahuang")


