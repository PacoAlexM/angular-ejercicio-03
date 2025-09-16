const { writeFileSync, mkdirSync } = require('fs');

require('dotenv').config();

const targetPath = './src/environments/environment.ts';
const targetPathDev = './src/environments/environment.development.ts';

const production = process.env['PRODUCTION'];
const companyName = process.env['COMPANY_NAME'];
const companyName2 = process.env['COMPANY_NAME_2'];
const companySlogan = process.env['COMPANY_SLOGAN'];
const giphyKey = process.env['GIPHY_API_KEY'];
const giphyUrl = process.env['GIPHY_URL'];

if (!production) {
    throw new Error('PRODUCTION is not set');
}
if (!companyName) {
    throw new Error('COMPANY_NAME is not set');
}
if (!companyName2) {
    throw new Error('COMPANY_NAME_2 is not set');
}
if (!companySlogan) {
    throw new Error('COMPANY_SLOGAN is not set');
}
if (!giphyKey) {
    throw new Error('GIPHY_API_KEY is not set');
}
if (!giphyUrl) {
    throw new Error('GIPHY_URL is not set');
}

const envFileContent = `export const environment = {
    production: ${production},
    companyName: "${companyName}",
    companyName2: "${companyName2}",
    companySlogan: "${companySlogan}",
    giphyApiKey: "${giphyKey}",
    giphyUrl: "${giphyUrl}",
}
`;

mkdirSync('./src/environments', { recursive: true });

writeFileSync(targetPath, envFileContent);
writeFileSync(targetPathDev, envFileContent);
