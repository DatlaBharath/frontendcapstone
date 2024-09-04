export class Group {
    id: number;
    name: string;
    announcementMessages: Message[];
    discussionMessages: Message[];
    admins: number[];
    users: number[];
    tags: string[];

    constructor(
        id: number,
        name: string,
        announcementMessages: Message[] = [],
        discussionMessages: Message[] = [],
        admins: number[] = [],
        users: number[] = [],
        tags: string[] = []
    ) {
        this.id = id;
        this.name = name;
        this.announcementMessages = announcementMessages;
        this.discussionMessages = discussionMessages;
        this.admins = admins;
        this.users = users;
        this.tags = tags;
    }

    toString(): string {
        return `Group {
            id: ${this.id},
            name: "${this.name}",
            admins: [${this.admins.join(', ')}],
            users: [${this.users.join(', ')}],
            tags: [${this.tags.join(', ')}],
            announcementMessages: [${this.announcementMessages.map(m => m.toString()).join(', ')}],
            discussionMessages: [${this.discussionMessages.map(m => m.toString()).join(', ')}]
        }`;
    }
}

export class Message {
    id?: number;
    content?: string;
    timestamp?: string;
    sentBy?: number;

    constructor(id?: number, content?: string, timestamp?: string, sentBy?: number) {
        this.id = id;
        this.content = content;
        this.timestamp = timestamp;
        this.sentBy = sentBy;
    }

    toString(): string {
        return `Message {
            id: ${this.id},
            content: "${this.content}",
            timestamp: "${this.timestamp}",
            sentBy: ${this.sentBy}
        }`;
    }
}
