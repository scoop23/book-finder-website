#!/bin/sh

(cd client && npm run dev) &

(cd server && npm run dev) &

wait