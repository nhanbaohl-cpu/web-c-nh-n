import re

with open('src/data/experiences.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# For hn-sim
content = content.replace('"/portfolio/Portfolio_Trần Đình Bảo Nhân-images-8.jpg"', '"/ảnh dự án sim du lịch/480479928_1321084122330539_8242247431842356657_n.jpg"')
content = content.replace('"/portfolio/Portfolio_Trần Đình Bảo Nhân-images-14.jpg"', '"/ảnh dự án sim du lịch/638787478_1606569060448709_5839869850080730148_n.jpg"')

# For zoo-restaurant
content = content.replace('"/portfolio/Portfolio_Trần Đình Bảo Nhân-images-9.jpg"', '"/ảnh dự án nhà hàng/image (1).png"')
content = content.replace('"/portfolio/Portfolio_Trần Đình Bảo Nhân-images-10.jpg"', '"/ảnh dự án nhà hàng/image.png"')
content = content.replace('"/portfolio/Portfolio_Trần Đình Bảo Nhân-images-13.jpg"', '"/ảnh dự án nhà hàng/z8018872029923_2ab0917acebb3d37050e09437658cf3f.jpg"')

with open('src/data/experiences.ts', 'w', encoding='utf-8') as f:
    f.write(content)
