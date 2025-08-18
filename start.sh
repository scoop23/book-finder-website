#!/bin/sh

(cd frontend && npm run dev) &

(cd server && npm run dev) &

wait