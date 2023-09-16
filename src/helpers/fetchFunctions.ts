import fetch from 'node-fetch';

export async function getLastBlockNumber(): Promise<{
  jsonrpc: string;
  id: number;
  result: string;
}> {
  const url =
    'https://api.etherscan.io/api' +
    '?module=proxy' +
    '&action=eth_blockNumber' +
    '&apikey=YourApiKeyToken';
  const response = await fetch(url, {
    method: 'GET',
  });
  const data = response.json() as any;
  return data;
}

export async function getBlockInfo(tag: string): Promise<{
  jsonrpc: string;
  id: number;
  result: any;
}> {
  const url =
    'https://api.etherscan.io/api' +
    '?module=proxy' +
    '&action=eth_getBlockByNumber' +
    '&tag=' +
    tag +
    '&boolean=true' +
    '&apikey=YourApiKeyToken';
  const response = await fetch(url, {
    method: 'GET',
  });
  const data = response.json() as any;
  return data;
}
