export function formatDateRange(
  sessions: { local_date: string, name: string }[] | undefined,
  raceEndStr: string | null | undefined
): string {
  if (!sessions || sessions.length === 0) return '—';

  const fp1 = sessions.find(s =>
    s.name.toLowerCase().includes('fp1') ||
    s.name.toLowerCase().includes('practice 1')
  ) || sessions[0];

  const startStr = fp1?.local_date;
  const endStr = raceEndStr;

  if (!startStr || !endStr) return '—';

  const start = new Date(startStr.replace(' ', 'T'));
  const end = new Date(endStr.replace(' ', 'T'));

  if (isNaN(start.getTime()) || isNaN(end.getTime())) return '—';

  const startDay = start.getDate().toString().padStart(2, '0');
  const endDay = end.getDate().toString().padStart(2, '0');
  const month = end.toLocaleDateString('fr-FR', { month: 'short' })
    .replace('.', '')
    .toUpperCase();

  return `${startDay} - ${endDay} ${month}`;
}


export function slugify(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')                 // enlève les accents
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')     // remplace tout ce qui n’est pas lettre ou chiffre par "-"
    .replace(/^-+|-+$/g, '');        // retire les tirets en trop
}

