export function parseScssVars(vars: string){
    let str = vars;
    str = str.replace(':export', '');
    str = str.replace('{', '');
    str = str.replace('}','');
    const strEntries = str.split(';').map(strEntry=> strEntry.trim()).filter(Boolean);
    const entries = strEntries.map(strEntry=> strEntry.split(':').map(keyOrValue=> keyOrValue.trim()));
    return Object.fromEntries(entries);
}