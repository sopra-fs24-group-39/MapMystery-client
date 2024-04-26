import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

class WebSocketService {
  constructor() {
    this.client = null;
    this.connected = false;
  }

  initializeWebSocket() {
    const socket = new SockJS('https://sopra-fs24-group-39-server.oa.r.appspot.com:8080/ws');
    this.client = new Client({
      webSocketFactory: () => socket,
      debug: (str) => {
        console.log('STOMP Debug: ' + str);
      },
      reconnectDelay: 5000,
      onConnect: () => {
        console.log('WebSocket connected');
        this.connected = true;
      },
      onDisconnect: () => {
        console.log('WebSocket disconnected');
        this.connected = false;
      },
      onStompError: (frame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
      }
    });

    this.client.activate();
  }

  async subscribe1(lobbyId, onMessageReceived) {
    //console.log(`(WS) received lobby id: ${lobbyId}`);
    lobbyId = localStorage.getItem("lobby");
    //console.log(`(WS) storage lobby id: ${lobbyId}`);

    if (!this.client || !this.connected) {
      console.log("Client is not connected or not initialized.");
      await this.waitForConnection();
    }

    if (this.connected) {
      const subscription = this.client.subscribe(`/topic/lobby/GameMode1/coordinates/${lobbyId}`, (message) => {
        //console.log(`(WS) Subscribed to: /topic/lobby/GameMode1/${lobbyId}`);
        //console.log("(WS) Received message:", message.body);
        onMessageReceived(message.body);
      });

      return subscription;
    }
  }

  async subscribe2(lobbyId, onMessageReceived) {
    //console.log(`(WS) received lobby id: ${lobbyId}`);
    lobbyId = localStorage.getItem("lobby");
    //console.log(`(WS) storage lobby id: ${lobbyId}`);

    if (!this.client || !this.connected) {
      console.log("Client is not connected or not initialized.");
      await this.waitForConnection();
    }

    if (this.connected) {
      const subscription = this.client.subscribe(`/topic/lobby/GameMode1/LeaderBoard/${lobbyId}`, (message) => {
        //console.log(`(WS) Subscribed to: /topic/lobby/GameMode1/${lobbyId}`);
        //console.log("(WS) Received message:", message.body);
        onMessageReceived(message.body);
      });

      return subscription;
    }
  }

  async waitForConnection() {
    while (!this.connected) {
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }

  disconnect() {
    if (this.client && this.connected) {
      this.client.deactivate().then(() => {
        //console.log("WebSocket client deactivated.");
        this.connected = false;
      }).catch((error) => {
        //console.error("Failed to deactivate WebSocket client:", error);
      });
    }
  }
}

export const webSocketService = new WebSocketService();

