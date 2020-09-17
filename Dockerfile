FROM alpine AS cloner
WORKDIR /app
RUN apk add --no-cache --virtual=build-dependencies --upgrade \
        git && \
    git clone https://github.com/wiseindy/timer-for-google-assistant.git . && \
    rm -rf .git

FROM node:12 AS builder
WORKDIR /app
COPY --from=cloner /app/package*.json ./
RUN npm install

COPY --from=cloner /app ./
RUN npm run build

FROM node:12-slim AS production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# set version for s6 overlay
ARG OVERLAY_VERSION="v2.0.0.1"
ARG OVERLAY_ARCH="amd64"
ENV S6_BEHAVIOUR_IF_STAGE2_FAILS=2

WORKDIR /app
COPY --from=cloner /app/package*.json ./
RUN npm install --only=production

COPY --from=cloner /app ./
COPY --from=builder /app/dist ./dist

ADD https://github.com/just-containers/s6-overlay/releases/download/${OVERLAY_VERSION}/s6-overlay-${OVERLAY_ARCH}.tar.gz /tmp/
RUN \
  echo "**** lines from linuxserver.io base image ****" && \
  echo "**** add s6 overlay ****" && \
  tar xfz \
          /tmp/s6-overlay-${OVERLAY_ARCH}.tar.gz -C / && \
  echo "**** create abc user and make our folders ****" && \
  useradd -u 911 -U -d /config -s /bin/false abc && \
  usermod -G users abc && \
  mkdir -p \
	  /app \
	  /config \
	  /defaults && \
  mv /usr/bin/with-contenv /usr/bin/with-contenvb && \
  echo "**** cleanup ****" && \
  apt-get clean && \
  apt-get autoclean -qq -y && \
  apt-get autoremove -qq -y &&  \
  rm -rf \
	/tmp/* \
	/var/lib/apt/lists/* \
	/var/tmp/*

COPY root/ /

ENTRYPOINT ["/init"]
EXPOSE 3000
