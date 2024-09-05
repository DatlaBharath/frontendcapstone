import { Component, OnInit } from '@angular/core'; // Import the configuration
import { ChatService } from '../chat.service';
import { StorageService } from '../token.service';
import { Group } from '../Group';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';


interface Chat {
  name: string;
  lastMessage: string | undefined;
  time: string |undefined;
  status: string | undefined;
  tags: string[] | undefined;
}

interface Message {
  text: string | undefined;
  time: string | undefined;
  sender: string | undefined;
  type: 'sent' | 'received';
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  standalone : true,
  imports: [CommonModule,FormsModule,RouterLink,NavbarComponent]
  
})


export class ChatComponent implements OnInit{
  chatAdminMessages : { [key: string]: Message[] } = {};
  chatDiscussionMessages : { [key: string]: Message[] } = {};
  intervalId!:any;
  chatsGroupsData!:Group[];
  chats: Chat[] = [];
  selectedChat: string ="";
  renderData(): void {
    // this.chats = [];
    this.chatAdminMessages = {};
    this.chatDiscussionMessages = {};

    this.chatService.getAllAnnouncements().subscribe(d => {
        this.chatsGroupsData = d;
        console.log(this.chatsGroupsData);

        this.chatsGroupsData.slice(this.chats.length).forEach(element => {
          console.log(element);

          this.chats.push({
              name: element.name,
              lastMessage: element.discussionMessages[element.discussionMessages.length - 1]?.content,
              time: element.discussionMessages[element.discussionMessages.length - 1]?.timestamp,
              status: "",
              tags: element.tags
          });
        });

        this.chatsGroupsData.forEach(element => {
            // console.log(element);

            // this.chats.push({
            //     name: element.name,
            //     lastMessage: element.discussionMessages[element.discussionMessages.length - 1]?.content,
            //     time: element.discussionMessages[element.discussionMessages.length - 1]?.timestamp,
            //     status: "",
            //     tags: element.tags
            // });

            // Initialize the arrays for each chat
            this.chatAdminMessages[element.name] = [];
            this.chatDiscussionMessages[element.name] = [];

            element.announcementMessages.forEach(msg => {
                this.chatAdminMessages[element.name].push({
                    text: msg?.content,
                    time: msg.timestamp,
                    sender: `sent by`,
                    type: (msg.sentBy === this.storageService.get("user").id ? "sent" : "received")
                });
            });

            element.discussionMessages.forEach(msg => {
                this.chatDiscussionMessages[element.name].push({
                    text: msg?.content,
                    time: msg.timestamp,
                    sender: "sent by",
                    type: (msg.sentBy === this.storageService.get("user").id ? "sent" : "received")
                });
            });
        });

        if (this.chats.length > 0) {
            this.selectedChat = (this.selectedChat.length > 0 ? this.selectedChat : this.chats[0]["name"]);
            this.messages = this.chatAdminMessages[this.selectedChat] || [];
        }
    });
}

  constructor(private chatService:ChatService,private storageService:StorageService){}
  ngOnInit(): void {
    this.renderData();
    this.intervalId = setInterval(() => {
      this.renderData();
    }, 5000);
    // Subscribe to WebSocket messages
    
  }

  // chats!: Chat[] = [
  //   { name: 'Main Group', lastMessage: 'Haha oh man 😂', time: '12m', status: 'active', tags: ['Question', 'Help wanted'] },
  //   { name: 'Diwali', lastMessage: 'woohooep', time: '24m', status: '', tags: [''] },
  //   { name: 'Yoga', lastMessage: 'Haha that’s terrifying 😂', time: '1h', status: '', tags: ['Bug', 'Hacktoberfest'] },
  //   { name: '1st Floor', lastMessage: 'omg, this is amazing', time: '5h', status: '', tags: ['Question', 'Some content'] },
  // ];

   // Messages for each chat
  //  chatAdminMessages: { [key: string]: Message[] } = {
  //   'Main Group': [
  //     { text: 'omg, this is amazing', time: '12m', sender: 'received', type: 'received' },
  //     { text: 'perfect!👌', time: '11m', sender: 'sent', type: 'sent' },
  //     { text: 'Wow, this is really epic', time: '10m', sender: 'received', type: 'received' },
  //     { text: 'How are you?', time: '9m', sender: 'sent', type: 'sent' },
  //     { text: 'just ideas for next time', time: '8m', sender: 'received', type: 'received' },
  //     { text: 'I’ll be there in 2 mins', time: '7m', sender: 'sent', type: 'sent' },
  //     { text: 'woohoooo', time: '6m', sender: 'received', type: 'received' },
  //     { text: 'Haha oh man', time: '5m', sender: 'sent', type: 'sent' },
  //     { text: 'Haha that’s terrifying 😂', time: '4m', sender: 'received', type: 'received' },
  //     { text: 'aww', time: '3m', sender: 'sent', type: 'sent' },
  //   ],
  //   'Diwali': [
  //     // Messages for Diwali chat
  //     { text: 'Happy Diwali!', time: '15m', sender: 'received', type: 'received' },
  //     { text: 'Thanks! Same to you!', time: '14m', sender: 'sent', type: 'sent' }
  //   ],
  //   // Add messages for other chats similarly
  // };

  
  messages: Message[] = (this.chatAdminMessages[this.selectedChat] != undefined ? this.chatAdminMessages[this.selectedChat] : []) ;

  newMessage='';
  newChatName: string = ''; // For new chat input
  newChatTags: string = '';
  showModal: boolean = false; // Flag to control modal visibility

  searchTerm: string = '';

  get filteredChats(): Chat[] {
    if (!this.searchTerm) {
      return this.chats;
    }
    return this.chats.filter(chat => chat.name.toLowerCase().includes(this.searchTerm.toLowerCase()));
  }

  sendMessage(){
    if (this.newMessage.trim()) {
      // Add new message to the messages array

      let id = this.chatsGroupsData.filter(ele => ele.name == this.selectedChat)[0]?.id

      this.chatService.createMessage(id,this.newMessage,this.storageService.get("user").id).subscribe(d => this.renderData());


      // this.messages?.push({
      //   text: this.newMessage,
      //   time: 'Just now', // You can modify this to the current time if needed
      //   sender: 'sent',
      //   type: 'sent'
      // });
      
      // Clear the new message input
      this.newMessage = '';
  }
}

selectChat(chatName: string) {
  this.selectedChat = chatName;
  this.messages = this.chatAdminMessages[chatName];
}

newGroup() {
  this.showModal = true;
}

closeNewChatModal() {
  this.showModal = false;
}

addNewChat() {
  if (this.newChatName.trim() && !this.chats.some(chat => {chat.name === this.newChatName})) {
    // Add the new chat to the chats list
    // this.chats.push({
    //   name: this.newChatName,
    //   lastMessage: '',
    //   time: 'Just now',
    //   status: '',
    //   tags: []
    // });

    this.chatService.createAnnouncements(this.newChatName,this.newChatTags).subscribe(d => this.renderData())

    // Initialize empty messages for the new chat
    // this.chatAdminMessages[this.newChatName] = [];
    this.newChatName = '';
    this.showModal = false;
  }
}

}
