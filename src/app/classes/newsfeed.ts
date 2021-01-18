export class Posts {
    id: number;
    text_post: string;
    date_post?: Date;
    image_post?: string;
    reactions?: Array<Reactions>;
    comments?: Array<Comments>;
    shares?: Shares;
    user?: UserInfo;
}

export class Reactions {
    id_reaction: number;
    type_reaction: string;
    num_reaction: number;
}

export class Comments {
    id_comment: number;
    text_comment: string;
    date_comment: Date;
    replies?: Array<Replies>;
}

export class Replies {
    id_reply: number;
    text_reply: string;
    date_reply?: Date;
}

export class Shares {
    id_share: number;
    num_share: number;
}

export class UserInfo {
    id_user: number;
    username: string;
    image_user: string;
}