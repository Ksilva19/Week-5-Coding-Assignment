class Song {
    constructor(title, singer) {
        this.title = title;
        this.singer = singer;
    }
 
    describe() {
        return `${this.title} was written by ${this.singer}.`
    }
}
 
class Playlist {
    constructor(name) {
        this.name = name;
        this.songs = [];
    }
 
    addSong(song) {
        if (song instanceof Song) {
            this.songs.push(song);
        } else {
            throw new Error(`${song} is not a real song.`)
        }
    }
 
    describe() {
        return `${this.name} has ${this.songs.length} songs.`
    }
}
 

class Menu {
    constructor(){
        this.names = [];
        this.selectedPlaylist = null;
    }
 
    start() {
        let selection = this.showMainMenu();
 
        while (selection != 0) {
            switch (selection) {
                case `1`: 
                    this.createPlaylist();
                    break;
                case `2`:
                    this.viewPlaylist();
                    break;
                case `3`:
                    this.removePlaylist();
                    break;
                case `4`: 
                    this.viewAllPlaylists();
                    break;
                default:
                    selection = 0;
            }
 
            selection = this.showMainMenu();
        }
 
        alert(`See you next time!`);
    }
 
    showMainMenu() {
        return prompt(`
            0) Exit
            1) New Playlist
            2) View Playlist
            3) Delete Playlist
            4) View All Playlists
        `);
    }
 
    viewPlaylistOptions(genreInfo) {
        return prompt(`
            0) Return
            1) Add New Song
            2) Remove Existing Song
            ${genreInfo}
        `);
    }
 
    viewAllPlaylists() {
        let playlistString = ``;
        for (let i = 0; i < this.names.length; i++) {
            playlistString += i + `) ` + this.names[i].name + `\n`;
        }
        alert(playlistString);
    }
 
    createPlaylist() {
        let name = prompt(`Enter name for new playlist:`);
        this.names.push(new Playlist(name));
    }
 
    viewPlaylist() {
        let index = prompt(`Enter the index of the playlist you wish to view:`);
        if (index > -1 && index < this.names.length) {
            this.selectedPlaylist = this.names[index];
            let description = `Playlist: ` + this.selectedPlaylist.name + `\n`;
        
        for (let i = 0; i < this.selectedPlaylist.songs.length; i++) {
            description += i + `) ` + this.selectedPlaylist.songs[i].title + ` by ` + this.selectedPlaylist.songs[i].singer + `\n`;
        }
 
        let selection = this.viewPlaylistOptions(description);
        switch (selection) {
            case `1`:
                this.newSong();
                break;
            case `2`:
                this.removeSong();
            }
        }
    }
 
    removePlaylist() {
        let index = prompt(`Enter the index of the playlist you would like to remove:`);
        if(index > -1 && index < this.names.length) {
            this.names.splice(index, 1);
        }
    }
 
    newSong() {
        let title = prompt(`Enter the name of the song:`);
        let singer = prompt(`Enter the name of the artist:`);
        this.selectedPlaylist.songs.push(new Song(title, singer));
    }
 
    removeSong() {
        let index = prompt(`Enter the index of the song you would like to remove:`)
        if (index > -1 && index < this.selectedPlaylist.songs.length) {
            this.selectedPlaylist.songs.splice(index, 1);
        }
    }
}
 
let menu = new Menu ();
menu.start();