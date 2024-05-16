import React, {useEffect, useState} from 'react';
import "../../styles/ui/RankingsContainer.scss";
import { api} from "helpers/api";


const players = [{'id': 1,
                  'name': 'StarlightSprinter',
                  'overall_points': 150,
                  'last30days_points': 64},
                 {'id': 2,
                  'name': 'QuantumQuest',
                  'overall_points': 140,
                  'last30days_points': 67},
                 {'id': 3,
                  'name': 'EchoEnigma',
                  'overall_points': 130,
                  'last30days_points': 41},
                 {'id': 4,
                  'name': 'NebulaNavigator',
                  'overall_points': 120,
                  'last30days_points': 93},
                 {'id': 5,
                  'name': 'PixelPioneer',
                  'overall_points': 110,
                  'last30days_points': 24},
                 {'id': 6,
                  'name': 'CyberSorcerer',
                  'overall_points': 100,
                  'last30days_points': 55},
                 {'id': 7,
                  'name': 'MysticMerlin',
                  'overall_points': 90,
                  'last30days_points': 79},
                 {'id': 8,
                  'name': 'GalacticGuardian',
                  'overall_points': 80,
                  'last30days_points': 24},
                 {'id': 9,
                  'name': 'InfinityImpulse',
                  'overall_points': 70,
                  'last30days_points': 64},
                 {'id': 10,
                  'name': 'PhantomPhoenix',
                  'overall_points': 60,
                  'last30days_points': 45},
                 {'id': 11,
                  'name': 'QuantumQuirk',
                  'overall_points': 50,
                  'last30days_points': 41},
                 {'id': 12,
                  'name': 'SolarSpecter',
                  'overall_points': 40,
                  'last30days_points': 78},
                 {'id': 13,
                  'name': 'NebulaKnight',
                  'overall_points': 30,
                  'last30days_points': 91},
                 {'id': 14,
                  'name': 'PixelProdigy',
                  'overall_points': 20,
                  'last30days_points': 67},
                 {'id': 15,
                  'name': 'CyberCenturion',
                  'overall_points': 10,
                  'last30days_points': 99}];

/*const friends = [
  {'id': 2,
  'name': 'QuantumQuest',
  'overall_points': 140,
  'last30days_points': 67},
  {'id': 9,
   'name': 'InfinityImpulse',
   'overall_points': 70,
   'last30days_points': 64},
  {'id': 14,
   'name': 'PixelProdigy',
   'overall_points': 20,
   'last30days_points': 67},
];*/


const BaseElementRankings: React.FC<BaseElementRankings> = ({ width, height }) => {
   const [sortedFriends, setSortedFriends] = useState([]);
   const [sortedPlayers, setSortedPlayers] = useState([]);
   const [friends, setFriends] = useState([]);

    useEffect(() => {
        async function fetchfriends() {
            try {
                const token = localStorage.getItem("token");
                const config = {
                    headers: {
                        Authorization: `${token}`
                    }
                };
                const userId = localStorage.getItem("userId");
                const response = await api.get(`/friends/${userId}`,config);
                const fetchedFriends = response.data.map(friend => ({
                    id: friend.id,
                    name: friend.username, // Assuming the username needs to be mapped to name
                    overall_points: friend.currentpoints,
                    last30days_points: 0 // Setting last30days_points to 0 for every friend
                    // Add other attributes if needed
                }));
                setFriends(fetchedFriends);
                setSortedFriends([...fetchedFriends]); // Update sortedFriends after friends have been set
            } catch (error) {
                console.error('Failed to fetch friends:', error);
            }
        }
        async function fetchPlayers() {
            try {
                const userId = localStorage.getItem("userId");
                // Fetch players data using your API
                const response = await api.get(`/users`);
                const fetchedPlayers = response.data.map(player => ({
                    id: player.id,
                    name: player.username,
                    overall_points: player.currentpoints,
                    last30days_points: 0
                    // Add other attributes if needed
                }));
                setSortedPlayers([...fetchedPlayers]); // Update sortedPlayers with fetched player data
            } catch (error) {
                console.error('Failed to fetch players:', error);
            }
        }


        fetchfriends();
        fetchPlayers();
    }, []);


   const [sortCriteria, setSortCriteria] = useState({
     friends: {
       overall_points: { direction: 'up' },
       last30days_points: { direction: 'up' }
     },
     global: {
       overall_points: { direction: 'up' },
       last30days_points: { direction: 'up' }
     }
   });

   const sortData = (dataset, setDataset, group, key) => {
     const isDescending = sortCriteria[group][key].direction === 'down';
     const sortedArray = [...dataset].sort((a, b) => isDescending ? b[key] - a[key] : a[key] - b[key]);
     setDataset(sortedArray);
     setSortCriteria(prev => ({
       ...prev,
       [group]: {
         ...prev[group],
         [key]: { direction: isDescending ? 'up' : 'down' }
        }
     }));
   };


   const style = { width, height, overflowY: 'auto' };
   const arrowStyle = { color: 'yellow' };

   return (
     <div className="base-element-rankings" style={style}>
       <div className="full-width-container">
         <div className="title-row">
           You and your friends:
           <div className="button-cont">
             <button className="overall_button" onClick={() => sortData(sortedFriends, setSortedFriends, 'friends', 'overall_points')}>
               Overall
               <span style={arrowStyle}>
                 {sortCriteria.friends.overall_points.direction === 'down' ? '▼' : '▲'}
               </span>
             </button>
             <button className="overall_button" onClick={() => sortData(sortedFriends, setSortedFriends, 'friends', 'last30days_points')}>
               Last 30 Days
               <span style={arrowStyle}>
                 {sortCriteria.friends.last30days_points.direction === 'down' ? '▼' : '▲'}
               </span>
             </button>
           </div>
         </div>
         {sortedFriends.map((player, index) => (
           <div
             key={player.id}
             className={`player-row ${index % 2 === 0 ? 'light-stripe' : 'dark-stripe'} ${player.id === 2 ? 'highlighted-row' : ''}`}
           >
             <div className="player-id">#{player.id}</div>
             <div className="player-name">{player.name}</div>
             <div className="player-overall">{player.overall_points}</div>
             <div className="player-last30days">{player.last30days_points}</div>
           </div>
         ))}
         <div className="title-row">
           Global Ranking:
           <div className="button-cont">
             <button className="overall_button" onClick={() => sortData(sortedPlayers, setSortedPlayers, 'global', 'overall_points')}>
               Overall
               <span style={arrowStyle}>
                 {sortCriteria.global.overall_points.direction === 'down' ? '▼' : '▲'}
               </span>
             </button>
             <button className="overall_button" onClick={() => sortData(sortedPlayers, setSortedPlayers, 'global', 'last30days_points')}>
               Last 30 Days
               <span style={arrowStyle}>
                 {sortCriteria.global.last30days_points.direction === 'down' ? '▼' : '▲'}
               </span>
             </button>
           </div>
         </div>
         {sortedPlayers.map((player, index) => (
           <div
             key={player.id}
             className={`player-row ${index % 2 === 0 ? 'light-stripe' : 'dark-stripe'} ${player.id === 2 ? 'highlighted-row' : ''}`}
           >
             <div className="player-id">#{player.id}</div>
             <div className="player-name">{player.name}</div>
             <div className="player-overall">{player.overall_points}</div>
             <div className="player-last30days">{player.last30days_points}</div>
           </div>
         ))}
       </div>
     </div>
   );
};

export default BaseElementRankings;

