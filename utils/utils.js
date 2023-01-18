export function checkIfCountryIsBrazil() {
    const [region,] = Intl.DateTimeFormat().resolvedOptions().timeZone.split('/');
    return region === 'America';
}
