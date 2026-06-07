
#!/bin/bash

device_id=$(kdeconnect-cli -a --id-only | head -n1)

if [ -z "$device_id" ]; then
  echo '{"icon": "disconnected"}'
  exit 0
fi

device_name=$(kdeconnect-cli -d "$device_id" -n | sed -n 's/^.*Name: //p')
battery=$(kdeconnect-cli -d "$device_id" --battery 2>/dev/null | grep -oP '\d+(?=%)' || echo "N/A")
status=$(kdeconnect-cli -d "$device_id" | grep "Connected" &>/dev/null && echo "Connected" || echo "Disconnected")

echo "{
  \"icon\": \"connected\",
  \"name\": \"$device_name\",
  \"battery\": \"$battery\",
  \"status\": \"$status\"
}"
