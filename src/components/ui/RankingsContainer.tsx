import React, { useEffect, useState } from 'react';
import "../../styles/ui/RankingsContainer.scss";
import { api } from "helpers/api";

const BaseElementRankings: React.FC<BaseElementRankings> = ({ width, height }) => {
    const [sortedFriends, setSortedFriends] = useState([]);
    const [sortedPlayers, setSortedPlayers] = useState([]);
    const style = { width, height, overflowY: 'auto' };
    const arrowStyle = { color: 'yellow' };
    const username = localStorage.getItem('username');

    useEffect(() => {
        async function fetchFriendsAndCurrentUser() {
            try {
                const token = localStorage.getItem("token");
                const config = {
                    headers: {
                        Authorization: `${token}`
                    }
                };
                const userId = localStorage.getItem("userId");

                const friendsResponse = await api.get(`/rankings/${userId}`, config);
                const fetchedFriends = friendsResponse.data.map(friend => ({
                    id: friend.id,
                    name: friend.username,
                    overall_points: friend.currentpoints,
                    last30days_points: friend.pointsthismonth
                }));

                const currentUserResponse = await api.get(`/users/${userId}`, config);
                const currentUser = currentUserResponse.data;
                const currentUserData = {
                    id: currentUser.id,
                    name: currentUser.username,
                    overall_points: currentUser.currentpoints,
                    last30days_points: currentUser.pointsthismonth
                };

                //adding current user to friends because section is called you and your friends
                const combinedData = [...fetchedFriends, currentUserData];
                const rankedFriends = assignRanks(combinedData);
                setSortedFriends(rankedFriends);
            } catch (error) {
                console.error('Failed to fetch friends or current user:', error);
            }
        }

        async function fetchPlayers() {
            try {
                const response = await api.get(`/rankings`);
                const fetchedPlayers = response.data.map(player => ({
                    id: player.id,
                    name: player.username,
                    overall_points: player.currentpoints,
                    last30days_points: player.pointsthismonth
                }));
                const rankedPlayers = assignRanks(fetchedPlayers);
                setSortedPlayers(rankedPlayers);
            } catch (error) {
                console.error('Failed to fetch players:', error);
            }
        }

        fetchFriendsAndCurrentUser();
        fetchPlayers();
    }, []);

    const [sortCriteria, setSortCriteria] = useState({
        friends: {
            overall_points: { direction: 'down' },
            last30days_points: { direction: 'up' }
        },
        global: {
            overall_points: { direction: 'down' },
            last30days_points: { direction: 'up' }
        }
    });

    const sortData = (dataset, setDataset, group, key) => {
        const isDescending = sortCriteria[group][key].direction === 'down';
        const sortedArray = [...dataset].sort((a, b) => isDescending ? a[key] - b[key] : b[key] - a[key]);
        setDataset(sortedArray);
        setSortCriteria(prev => ({
            ...prev,
            [group]: {
                ...prev[group],
                [key]: { direction: isDescending ? 'up' : 'down' }
            }
        }));
    };

    const assignRanks = (players) => {
        const sortedByOverallPoints = [...players].sort((a, b) => b.overall_points - a.overall_points);
        return sortedByOverallPoints.map((player, index) => ({
            ...player,
            rank: index + 1
        }));
    };

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
                            This Month
                            <span style={arrowStyle}>
                                {sortCriteria.friends.last30days_points.direction === 'down' ? '▼' : '▲'}
                            </span>
                        </button>
                    </div>
                </div>
                {sortedFriends.map((player) => (
                    <div
                        key={player.id}
                        className={`player-row ${player.rank % 2 === 0 ? 'light-stripe' : 'dark-stripe'} ${player.name === username ? 'highlighted-row' : ''}`}
                    >
                        <div className="player-id">#{player.rank}</div>
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
                            This Month
                            <span style={arrowStyle}>
                                {sortCriteria.global.last30days_points.direction === 'down' ? '▼' : '▲'}
                            </span>
                        </button>
                    </div>
                </div>
                {sortedPlayers.map((player) => (
                    <div
                        key={player.id}
                        className={`player-row ${player.rank % 2 === 0 ? 'light-stripe' : 'dark-stripe'} ${player.name === username ? 'highlighted-row' : ''}`}
                    >
                        <div className="player-id">#{player.rank}</div>
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
