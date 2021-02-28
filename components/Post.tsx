/* eslint-disable react/display-name */
import { Post, User } from "@prisma/client";
import { Session } from "next-auth/client";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";
import Downvote from "./icons/Downvote";
import PencilIcon from "./icons/Pencil";
import TrashIcon from "./icons/Trash";
import Upvote from "./icons/Upvote";

export default function PostComponent({ a, d, session }: {
    a: User,
    d: Post,
    session: Session
}): JSX.Element {
    const router = useRouter();

    return (
        <div className="my-4 text-white rounded-xl bg-gray-800 p-12">
            <div className="inline-flex mb-4 items-center space-x-3">
                <img src={a.image as string} className="rounded-full" width="32" height="32s" />
                <Link href={`/users/${a.snowflake}`} passHref>
                    <a className="font-bold text-gray-300 text-sm">{a.name}</a>
                </Link>
                <div className="inline-flex space-x-3 divide-x-2">
                    <p className="font-semibold text-gray-400 text-sm">Posted: {d.createdAt}</p>
                </div>
                {session.user.snowflake === a.snowflake && (
                    <div className="flex space-x-3">
                        <Link href={`/posts/${d.snowflake}/edit`}>
                            <a className="hover:text-indigo-600 transition duration-200">
                                <PencilIcon />
                            </a>
                        </Link>
                        <a onClick={(e) => {
                            e.preventDefault()

                            toast.promise(fetch(`/api/post/${d.snowflake}`, {
                                method: 'DELETE',
                                credentials: 'same-origin',
                            }), {
                                loading: 'Deleting...',
                                success: () => {
                                    return (
                                        <>
                                            <p>Deleted!</p>
                                            <span className="hidden">{setTimeout(async () => router.replace('/'), 3000)}</span>
                                        </>
                                    )
                                },
                                error: 'Something went wrong.'
                            })
                        }} className="hover:text-indigo-600 transition duration-200">
                            <TrashIcon />
                        </a>
                    </div>
                )}
            </div>
            <article className="prose lg:prose-xl prose-dark">
                <ReactMarkdown className="text-white">
                    {d?.content}
                </ReactMarkdown>
            </article>
            <div className="inline-flex float-right space-x-4 align-middle items-center">
                <button>
                    <Upvote />
                </button>
                <p>{d?.votes}</p>
                <button>
                    <Downvote />
                </button>
            </div>
        </div>
    )
}