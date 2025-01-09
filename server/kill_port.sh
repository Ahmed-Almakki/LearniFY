#!/bin/bash
PORT=3000

PID=$(lsof -t -i :$PORT)

if [ -n "$PID" ]; then
  echo "Process found on port $PORT. Killing PID $PID..."
  kill -9 $PID
  echo "Process on port $PORT has been terminated."
else
  echo "No process is using port $PORT."
fi
