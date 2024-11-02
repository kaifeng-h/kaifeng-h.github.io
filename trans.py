import os
import sqlite3

def xiaowang(x):
    if x == "dahuang":
        print("爱你哦～")
    else:
        print("win nio~")
    conn = sqlite3.connect('./src/info.sqlite')
    with open('index_template.html','r') as f:
        html = f.read()

    pub = updatePub(conn)
    news = updateNews(conn)

    with open('index.html','w') as f:
        newContent = html.replace("PUBLICATION__CONTENT", pub) #.replace("NEWS__CONTENT", pub)
        f.write(newContent)

    conn.close()

def updateNews(conn):
    return None
    
def updatePub(conn):
    # conn = sqlite3.connect('./src/info.sqlite')
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
            # print(author)
        author = author[0:-1]
        # print(author)
        year = data[5]
        acroym = data[18]
        loc = data[21]
        page = data[9]
        if page == None:
            page = 'accepted'
        source = data[17]
        conforj = data[16]
        if conforj == 'J':
            loc = ''
        else:
            loc = loc +','

        tcse ='<div id="distinguished"><font size="3" color="#0b5394">&nbsp;&nbsp;🏆IEEE TCSE Distinguished Paper Award&nbsp;&nbsp;</font></div>'
        sigsoft = '<div id="distinguished"><font size="3" color="#0b5394">&nbsp;&nbsp;🏆ACM SIGSOFT Distinguished Paper Award&nbsp;&nbsp;</font></div>'
        # tcse = '<br><font size="3" color="#0b5394"> 🏆IEEE TCSE Distinguished Paper Award</font>'
        # sigsoft = '<br><font size="3" color="#0b5394">🏆ACM SIGSOFT Distinguished Paper Award</font>'
        distinguishedpaper = ''
        if acroym == "ASE'18":
            distinguishedpaper = sigsoft
        if acroym == "ICSME'20":
            distinguishedpaper = tcse

        pdf = ''
        if data[28] != None:
            pdf = '<a href="' +data[28]+'">[PDF]</a>'
        # pdf= "[PDF]"
        template = f'<li><p><b><font size="3" color="#0b5394">[{acroym}]</font></b> <strong>{title}. {pdf}</strong>{distinguishedpaper}<br>{author}.<em>&nbsp;{source}, {loc} {page}, {year}.</em></p></li>'
        s = s + template + '\n'
    
    return s


if __name__ == "__main__":
    xiaowang("dahuang")


