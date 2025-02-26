import os
import sqlite3
from bs4 import BeautifulSoup

def xiaowang(x):
    if x == "dahuang":
        print("爱你哦～")
    else:
        print("win nio~")
    conn = sqlite3.connect('./src/info.sqlite')
    with open('index_template.html','r') as f:
        html = f.read()

    pub = updatePub(conn)
    updated_html = updateNews(conn, html)



    with open('index.html','w') as f:
        newContent = updated_html.replace("PUBLICATION__CONTENT", pub) #.replace("NEWS__CONTENT", pub)
        f.write(newContent)

    conn.close()

def updateNews(conn, html):
    soup = BeautifulSoup(html, features="html.parser")
    element = soup.select_one('#collapsibleList')
    cnt = 1
    limit = 8
    limit_date = None
    for child in element.children:
        if child.name:
            if(cnt <= limit -1 ):
                cnt += 1
                continue
            
            # No. 8
            if(cnt == limit):
                date = child.select_one('p:nth-child(1) > span > strong')
                limit_date = date.text.strip(' ').lstrip('[').rstrip(']')
                # print('limite date: ' + limit_date)
                cnt += 1
                continue
            # print(child.text.strip())
            date = child.select_one('p:nth-child(1) > span > strong')
            new_date = date.text.strip(' ').lstrip('[').rstrip(']')
            if new_date == limit_date:
                cnt += 1
                continue
            else:
                break
    cnt -=1
    new_cnt = 1
    for child in element.children:
        if child.name:
            if(new_cnt <= cnt):
                # todo
                date_ele = child.select_one('p:nth-child(1) > span > strong')
                new_img_tag = soup.new_tag('img')
                new_img_tag['src'] = 'images/new2-static.gif'
                new_img_tag['style'] = 'width:35px;height:35px;'
                new_img_tag['alt'] = ''
                date_ele.insert_after(new_img_tag)
                new_cnt += 1
            else:
                break

        #
    # Transform the BeautifulSoup object back into an HTML document
    updated_html = soup.prettify()  # For nicely formatted HTML
    # print(updated_html)
    return updated_html
    
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


