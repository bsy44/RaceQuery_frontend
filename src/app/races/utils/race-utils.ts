export function formatDateRange(
  sessions: { local_date: string, name: string }[] | undefined,
  raceEndStr: string | null | undefined
): string {
  if (!sessions || sessions.length === 0) return '—';

  // On récupère FP1 si possible
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


export function normalizeSessionName(name: string): string {
  const n = name.toLowerCase().replace(/\s+/g, '');

  if (n.includes('practice1') || n === 'fp1') return 'FP1';
  if (n.includes('practice2') || n === 'fp2') return 'FP2';
  if (n.includes('practice3') || n === 'fp3') return 'FP3';
  if (n.includes('Sprint Qualifying')) return 'SQ';
  if (n === 'sprint') return 'SPRINT';
  if (n.includes('qualifying')) return 'QUALIF';
  if (n.includes('race')) return 'RACE';

  return name;
}

