import React, { useState } from 'react';
import { assets } from '../assets/assets';

const Sidebar = () => {
  const [playlists, setPlaylists] = useState([{ name: 'fimperial', songs: [] }]); // "fimperial" with empty songs array
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [editingIndex, setEditingIndex] = useState(null); // Index of the playlist being edited
  const [editedPlaylistName, setEditedPlaylistName] = useState('');
  const [selectedPlaylistIndex, setSelectedPlaylistIndex] = useState(null); // Index of the selected playlist
  const [newSongName, setNewSongName] = useState(''); // New song to add to the playlist

  // Handler to create a playlist
  const createPlaylist = () => {
    if (newPlaylistName.trim() !== '') {
      setPlaylists([...playlists, { name: newPlaylistName, songs: [] }]);
      setNewPlaylistName(''); // Clear the input field after adding the playlist
    } else {
      alert('Please enter a name for the playlist');
    }
  };

  // Handler to delete a playlist (with confirmation for "fimperial")
  const deletePlaylist = (index) => {
    const playlistName = playlists[index].name;

    // Check if the playlist is "fimperial" and ask for confirmation
    if (playlistName === 'fimperial') {
      const confirmDelete = window.confirm('Are you sure you want to delete the "fimperial" playlist?');
      if (!confirmDelete) return; // Exit if the user cancels the deletion
    }

    // Proceed with deletion for all playlists
    const updatedPlaylists = playlists.filter((_, i) => i !== index);
    setPlaylists(updatedPlaylists);
  };

  // Handler to start editing a playlist
  const startEditing = (index) => {
    setEditingIndex(index);
    setEditedPlaylistName(playlists[index].name);
  };

  // Handler to save the edited playlist name
  const saveEditedPlaylist = () => {
    if (editedPlaylistName.trim() !== '') {
      const updatedPlaylists = [...playlists];
      updatedPlaylists[editingIndex].name = editedPlaylistName;
      setPlaylists(updatedPlaylists);
      setEditingIndex(null); // Stop editing
      setEditedPlaylistName('');
    } else {
      alert('Please enter a valid name for the playlist');
    }
  };

  // Handler to remove a song from a playlist
  const removeSongFromPlaylist = (playlistIndex, songIndex) => {
    const updatedPlaylists = [...playlists];
    updatedPlaylists[playlistIndex].songs.splice(songIndex, 1);
    setPlaylists(updatedPlaylists);
  };

  // Handler to select a playlist
  const selectPlaylist = (index) => {
    setSelectedPlaylistIndex(index);
  };

  // Handler to add a song to the selected playlist
  const addSongToPlaylist = () => {
    if (newSongName.trim() !== '' && selectedPlaylistIndex !== null) {
      const updatedPlaylists = [...playlists];
      updatedPlaylists[selectedPlaylistIndex].songs.push(newSongName);
      setPlaylists(updatedPlaylists);
      setNewSongName(''); // Clear the input field after adding the song
    } else {
      alert('Please enter a song name');
    }
  };

  return (
    <div className='w-[25%] h-full p-2 flex-col gap-2 text-white hidden lg:flex'>
      <div className='bg-[#121212] h-[15%] rounded flex flex-col justify-around'>
        {/* Create Playlist Section */}
        <div className='p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4'>
          <h1>Create your Playlist</h1>
          <p className='font-light'>It's easy, we will help you</p>
          <input
            type="text"
            value={newPlaylistName}
            onChange={(e) => setNewPlaylistName(e.target.value)}
            className='px-4 py-1.5 bg-[#333] text-white rounded-full mt-4'
            placeholder='Enter playlist name'
          />
          <button
            onClick={createPlaylist}
            className='px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4'>
            Create Playlist
          </button>
        </div>

        {/* Display Created Playlists */}
        <div className='p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4'>
          <h2>Your Playlists</h2>
          {playlists.length > 0 ? (
            <ul className='list-disc pl-5'>
              {playlists.map((playlist, index) => (
                <li key={index} className='text-sm'>
                  <div className='flex justify-between items-center'>
                    {/* Display playlist name */}
                    {editingIndex === index ? (
                      <input
                        type="text"
                        value={editedPlaylistName}
                        onChange={(e) => setEditedPlaylistName(e.target.value)}
                        className='bg-[#333] text-white px-2 py-1 rounded'
                      />
                    ) : (
                      <span
                        onClick={() => selectPlaylist(index)}
                        className='cursor-pointer hover:underline font-bold'>
                        {playlist.name}
                      </span>
                    )}
                    <div className='flex gap-2'>
                      {editingIndex === index ? (
                        <>
                          <button
                            onClick={saveEditedPlaylist}
                            className='px-2 py-1 bg-blue-500 text-white rounded-full'>
                            Save
                          </button>
                          <button
                            onClick={() => deletePlaylist(index)}
                            className='px-2 py-1 bg-red-500 text-white rounded-full'>
                            Delete Playlist
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => startEditing(index)}
                          className='px-2 py-1 bg-blue-500 text-white rounded-full'>
                          Edit
                        </button>
                      )}
                    </div>
                  </div>
                  {/* Display songs if this playlist is selected */}
                  {selectedPlaylistIndex === index && (
                    <div className='pl-5'>
                      <h3 className='font-semibold mt-2'>Songs</h3>
                      <ul className='list-disc pl-5'>
                        {playlist.songs.length > 0 ? (
                          playlist.songs.map((song, songIndex) => (
                            <li key={songIndex} className='flex justify-between'>
                              {song}
                              {editingIndex === index && (
                                <button
                                  onClick={() => removeSongFromPlaylist(index, songIndex)}
                                  className='px-2 py-1 bg-red-500 text-white rounded-full'>
                                  Remove
                                </button>
                              )}
                            </li>
                          ))
                        ) : (
                          <li>No songs added yet.</li>
                        )}
                      </ul>
                      {editingIndex === index && (
                        <>
                          <input
                            type="text"
                            value={newSongName}
                            onChange={(e) => setNewSongName(e.target.value)}
                            className='px-4 py-1.5 bg-[#333] text-white rounded-full mt-2'
                            placeholder='Enter song name'
                          />
                          <button
                            onClick={addSongToPlaylist}
                            className='px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-2'>
                            Add Song
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p>No playlists created yet. Start by creating one!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
