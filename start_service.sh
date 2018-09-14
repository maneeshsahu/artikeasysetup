#!/bin/bash

export SERIAL_NUMBER=(`cat /proc/device-tree/serial-number`)
export MAC1_ADDRESS=(`ip addr show $(awk 'NR==3{print $1}' /proc/net/wireless | tr -d :) | awk '/ether/{print $2}'`)

echo $SERIAL_NUMBER $MAC1_ADDRESS

node index.js