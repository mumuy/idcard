/*
    将远程文件存放于本地方便压缩
*/
import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';

const fetchRemoteFile = (remoteUrl, localPath) => {
    return {
        name: 'fetch-remote-file',
        async buildStart() {
            try {
                const response = await fetch(remoteUrl);
                if (!response.ok) {
                    throw new Error(`Failed to fetch remote file: ${response.status} ${response.statusText}`);
                }
                let fileContent = await response.text();
                if(remoteUrl.includes('.json')){
                    fileContent = `export default ${fileContent}`;
                }
                const dir = path.dirname(localPath);
                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir, { recursive: true });
                }
                fs.writeFileSync(localPath, fileContent);
                console.log(`Remote file saved to ${localPath}`);
            } catch (error) {
                console.error('Error fetching remote file:', error);
            }
        }
    };
};

export default fetchRemoteFile;   