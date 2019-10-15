console.log('The Spotify Key has loaded');

exports.spotify = {
    id: Process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
};