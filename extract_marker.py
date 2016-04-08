#!/usr/bin/env python
# -*- coding: utf-8 -*-
import sys
import json
import codecs

if __name__ == '__main__':
    path = sys.argv[1]
    with open(path, 'r') as f:
        content = json.loads(f.read())
        sections = []
        markers = []
        for section in content['blocks']:
            if section['type'] == 'image':
                images = section['args']['images']
                for image in images:
                    if 'marker' in image:
                        markers.append(image['marker'])
                        image['marker'] = len(markers) - 1

            sections.append(section)

    output = json.dumps({ 'markers': markers, 'sections': sections }, indent=4)
    with open(path, 'w') as writable:
        writable.write(output.encode('utf-8'))
