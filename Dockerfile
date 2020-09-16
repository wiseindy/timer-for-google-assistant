FROM node:12 AS builder
WORKDIR /usr/src/app
# COPY app/package*.json ./
RUN \
  apt-get update -qq && \
  apt-get install -qq --fix-missing \
                                    git && \
  git clone https://github.com/wiseindy/timer-for-google-assistant.git .

RUN npm install
RUN npm run build

FROM node:12-slim AS production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# set version for s6 overlay
ARG OVERLAY_VERSION="v2.0.0.1"
ARG OVERLAY_ARCH="amd64"
ENV S6_BEHAVIOUR_IF_STAGE2_FAILS=2

WORKDIR /usr/src/app
# COPY app/package*.json ./
RUN \
  apt-get update -qq && \
  apt-get install -qq --fix-missing \
                                    git && \
  git clone https://github.com/wiseindy/timer-for-google-assistant.git .

RUN npm install --only=production
# COPY app/ .
COPY --from=builder /usr/src/app/dist ./dist

ADD https://github.com/just-containers/s6-overlay/releases/download/${OVERLAY_VERSION}/s6-overlay-${OVERLAY_ARCH}.tar.gz /tmp/
RUN \
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
  apt-get remove -qq -y git && \
  apt-get clean && \
  apt-get autoclean -qq -y && \
  apt-get autoremove -qq -y &&  \
  rm -rf \
	/tmp/* \
	/var/lib/apt/lists/* \
	/var/tmp/*

COPY root/ /

EXPOSE 3000
ENTRYPOINT ["/init"]
