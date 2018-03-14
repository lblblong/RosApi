FROM node:8.9.3

RUN mkdir -p /home/service
WORKDIR /home/service
COPY . /home/service

RUN npm install -g cnpm --registry=https://registry.npm.taobao.org

RUN cnpm install
RUN cnpm install supervisor -g
RUN cnpm run start

EXPOSE 9090


