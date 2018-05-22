FROM daocloud.io/library/node:8.4.0-onbuild

RUN mkdir /code
WORKDIR /code

COPY . /code
RUN npm config set registry https://registry.npm.taobao.org
RUN npm install

EXPOSE 8080
CMD ["node","app.js"]