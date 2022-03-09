export function formatNumber(votes) {
  if (votes > 1000000) {
    const formattedVotes = (votes / 1000000).toFixed(1);
    if (!(formattedVotes % 1)) {
      return `${Math.round(formattedVotes)}m`;
    }
    return `${formattedVotes}m`;
  }

  if (votes > 1000) {
    const formattedVotes = (votes / 1000).toFixed(1);
    if (!(formattedVotes % 1)) {
      return `${Math.round(formattedVotes)}k`;
    }
    return `${formattedVotes}k`;
  }

  return votes;
}
