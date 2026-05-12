import os
import sqlite3
from bs4 import BeautifulSoup
import pandas as pd
import re

# main function
def xiaowang(x):
    if x == "dahuang":
        print("爱你哦～")
    else:
        print("win nio~")
    conn = sqlite3.connect('./src/info.sqlite')
    with open('index_template.html','r') as f:
        html = f.read()
    
    # Update news
    pub, bibcode = updatePub(conn)
    updatedhtml = mergeToCreateNews(conn, html)

    updated_html = updateNews(conn, updatedhtml)

        
    
    # Update pubs
    with open('index.html','w') as f:
        updated_pub = updated_html.replace("PUBLICATION__CONTENT", pub) #.replace("NEWS__CONTENT", pub)
        updated_pub_bib = updated_pub.replace("TEMPLATE_BIB", bibcode)
        f.write(updated_pub_bib)

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
    cursor = c.execute('select * from publications order by "order" desc;')
    s = ''
    bibcode = {}
    authorConfig = False
    for data in cursor:
        title = data[1]
        author = data[3]
        hidden = data[30]
        arxiv = data[31]
        bib = data[33]
        if hidden =='true':
            continue
        if data[0] == 21:
            authorConfig = True
        if authorConfig:
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
        else:
            newAus = author.replace(';',',')
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
        # pdf link
        if data[28] != None:
            pdf = '<a href="' +data[28]+'">[PDF]</a>'
        # arxiv link
        if data[28] == None and arxiv != None:
            pdf = '<a href="' + arxiv+'">[arXiv]</a>'
        # pdf= "[PDF]"
        
        bibDiv = ''
        if bib != None:
            bibDiv =  f'<a class="bib-link" onclick="showBib(`{acroym}`)">[BIB]</a>'
            bibcode[acroym] = bib

        if '-' in acroym:
            acroym = acroym.split('-')[0]
            
        template = f'<li><p><b><font size="3" color="#0b5394">[{acroym}]</font></b> <strong>{title}. {pdf}{bibDiv}</strong>{distinguishedpaper}<br>{author}.<em>&nbsp;{source}, {loc} {page}, {year}.</em></p></li>'
        s = s + template + '\n'
    
    return s, str(bibcode)



def mergeToCreateNews(conn, html_all):
    query_file = './src/SQLquery/merge_talks_services_publications'
    rows = []
    with open(query_file, 'r') as f:
        query = f.read()
        c =  conn.cursor()
        cursor = c.execute(query)
        for item in cursor:
            # print(item)
            rows.append(item)
    # Close connection
    conn.close()


    html_results = []

    for row in rows:

        row_type = row[0]
        title = row[1]
        date = row[2]
        extra = row[3]
        year = row[4]

        formatted_date = format_date(date)

        # -----------------------------------
        # Publications
        # -----------------------------------
        if row_type == "publication":

            if is_conference_publication(extra):

                venue = extra.replace("'", " 20")

                html = f"""
    <li>
        <p><span class="mydate"><strong>[{formatted_date}]&nbsp;</strong></span>
            Our paper titled "{title}" is accepted by <a href="">{venue}</a>.
        </p>
        <p></p>
    </li>
    """.strip()

            else:

                html = f"""
    <li>
        <p><span class="mydate"><strong>[{formatted_date}]&nbsp;</strong></span>
            Our paper titled "{title}" is accepted by <a href="">{extra}</a>.
        </p>
        <p></p>
    </li>
    """.strip()

            html_results.append(html)

        # -----------------------------------
        # Services
        # -----------------------------------
        elif row_type == "service":

            if is_conference_service(title):

                # extra format:
                # ISSTA 2026---https://conf.researchr.org/home/issta-2026

                short_name = title
                website = ""
                track = ''
                if extra and "---" in extra:
                    parts = extra.split("---")
                    short_name = parts[0]
                    website = parts[1]
                    track = parts[2]
                if track == '':
                    html = f"""
            <li>
                <p><span class="mydate"><strong>[{formatted_date}]&nbsp;</strong></span>
                    I was invited to serve on the Program Committee at
                    <a href="{website}">{short_name}</a>.
                <p></p>
            </li>
            """.strip()
                else:

                    html = f"""
            <li>
                <p><span class="mydate"><strong>[{formatted_date}]&nbsp;</strong></span>
                    I was invited to serve on the Program Committee of the {track} at
                    <a href="{website}">{short_name}</a>.
                <p></p>
            </li>
            """.strip()

            else:

                html = f"""
        <li>
            <p><span class="mydate"><strong>[{formatted_date}]&nbsp;</strong></span>
                I was invited to serve as a reviewer for {title}.
            <p></p>
        </li>
        """.strip()

            html_results.append(html)

        # -----------------------------------
        # Awards
        # -----------------------------------
        elif row_type == "awards":

            html = f"""
    <li>
        <p><span class="mydate"><strong>[{formatted_date}]&nbsp;</strong></span>
            I was honored to be selected as a {title} for {extra}!
        <p></p>
    </li>
    """.strip()

            html_results.append(html)

        # -----------------------------------
        # Talks
        # -----------------------------------
        elif row_type == "talk":

            if contains_chinese(title):

                html = f"""
    <li>
        <p><span class="mydate"><strong>[{formatted_date}]&nbsp;</strong></span>
            {extra}报告：<a href="">{title}</a>.
        <p></p>
    </li>
    """.strip()

            else:

                html = f"""
    <li>
        <p><span class="mydate"><strong>[{formatted_date}]&nbsp;</strong></span>
            I was invited to give a talk at <a href="">{extra}</a>.
        <p></p>
    </li>
    """.strip()

            html_results.append(html)

    # Print all generated HTML
    res = ''
    for item in html_results:
        res = res + item
        res = res + '\n'

    return  html_all.replace('NEWS_CONTENT', res)


def format_date(date_str):
    year, month, _ = date_str.split("-")
    return f"{year}.{month}"


def is_conference_publication(venue):
    return bool(re.match(r".+'\d{2}$", venue))


def is_conference_service(name):
    keywords = [
        "conference",
        "symposium",
        "workshop",
        "forum",
        "summit"
    ]
    name_lower = name.lower()
    return any(k in name_lower for k in keywords)


def contains_chinese(text):
    return bool(re.search(r'[\u4e00-\u9fff]', text))




if __name__ == "__main__":
    xiaowang("dahuang")










