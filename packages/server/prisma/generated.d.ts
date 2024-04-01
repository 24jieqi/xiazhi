/* eslint-disable */
import type { Prisma, User, Post, Entry, App } from "@prisma/client";
export default interface PrismaTypes {
    User: {
        Name: "User";
        Shape: User;
        Include: Prisma.UserInclude;
        Select: Prisma.UserSelect;
        OrderBy: Prisma.UserOrderByWithRelationInput;
        WhereUnique: Prisma.UserWhereUniqueInput;
        Where: Prisma.UserWhereInput;
        Create: Prisma.UserCreateInput;
        Update: Prisma.UserUpdateInput;
        RelationName: "posts";
        ListRelations: "posts";
        Relations: {
            posts: {
                Shape: Post[];
                Name: "Post";
                Nullable: false;
            };
        };
    };
    Post: {
        Name: "Post";
        Shape: Post;
        Include: Prisma.PostInclude;
        Select: Prisma.PostSelect;
        OrderBy: Prisma.PostOrderByWithRelationInput;
        WhereUnique: Prisma.PostWhereUniqueInput;
        Where: Prisma.PostWhereInput;
        Create: Prisma.PostCreateInput;
        Update: Prisma.PostUpdateInput;
        RelationName: "author";
        ListRelations: never;
        Relations: {
            author: {
                Shape: User | null;
                Name: "User";
                Nullable: true;
            };
        };
    };
    Entry: {
        Name: "Entry";
        Shape: Entry;
        Include: Prisma.EntryInclude;
        Select: Prisma.EntrySelect;
        OrderBy: Prisma.EntryOrderByWithRelationInput;
        WhereUnique: Prisma.EntryWhereUniqueInput;
        Where: Prisma.EntryWhereInput;
        Create: Prisma.EntryCreateInput;
        Update: Prisma.EntryUpdateInput;
        RelationName: "belongsTo";
        ListRelations: never;
        Relations: {
            belongsTo: {
                Shape: App | null;
                Name: "App";
                Nullable: true;
            };
        };
    };
    App: {
        Name: "App";
        Shape: App;
        Include: Prisma.AppInclude;
        Select: Prisma.AppSelect;
        OrderBy: Prisma.AppOrderByWithRelationInput;
        WhereUnique: Prisma.AppWhereUniqueInput;
        Where: Prisma.AppWhereInput;
        Create: Prisma.AppCreateInput;
        Update: Prisma.AppUpdateInput;
        RelationName: "entries";
        ListRelations: "entries";
        Relations: {
            entries: {
                Shape: Entry[];
                Name: "Entry";
                Nullable: false;
            };
        };
    };
}