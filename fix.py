import re

with open('src/data/experiences.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# For Seller POD
content = content.replace('"/ảnh dự án Seller POD/1.png"', '"/projects/seller-pod/1.png"')
content = content.replace('"/portfolio/Portfolio_Trần Đình Bảo Nhân-images-2.jpg"', '"/projects/seller-pod/1.png"')
content = content.replace('"/portfolio/Portfolio_Trần Đình Bảo Nhân-images-4.jpg"', '"/projects/seller-pod/1.png"')

# For Turkey Chicken Feet
content = content.replace('"/ảnh dự án chân gà/1.png"', '"/projects/turkey-chicken-feet/1.png"')
content = content.replace('"/portfolio/Portfolio_Trần Đình Bảo Nhân-images-11.jpg"', '"/projects/turkey-chicken-feet/1.png"')
content = content.replace('"/portfolio/Portfolio_Trần Đình Bảo Nhân-images-12.jpg"', '"/projects/turkey-chicken-feet/1.png"')

with open('src/data/experiences.ts', 'w', encoding='utf-8') as f:
    f.write(content)
