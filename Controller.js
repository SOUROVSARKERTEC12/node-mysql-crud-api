import {validationResult, matchedData} from "express-validator";
import pool from "./database";


const validation_result = validationResult.withDefaults({
    formatter: (error) => error.msg,
})

export const validator = async (req, res, next) => {
    const errors = await validation_result(req).mapped();
    if (Object.keys(errors).length) {
        return res.status(422).json({
            ok: 0,
            status: 422,
            errors
        })
    }
    next();
}

export const create = async (req, res, next) => {

    const {title, body, author} = matchedData(req);
    try {
        const [result] = await pool.execute(
            "INSERT INTO posts (title, content, author) VALUES (?, ?, ?)",
            [title, body, author]
        );
        res.status(201).json({
            ok: 1,
            status: 201,
            message: "Post has been created successfully",
            post_id: result.insertId,
        });
    } catch (e) {
        next(e);
    }
};


export const show_posts = async (req, res, next) => {
    try {
        let sql = "SELECT * FROM posts";
        if (req.params.id) {
            sql = `SELECT *
                   FROM posts
                   WHERE id = ${req.params.id}`
        }
        const [row] = await pool.query(sql);
        if (row.length === 0 && req.params.id) {
            return res.status(404).json({
                ok: 0,
                status: 404,
                message: "Invalid post ID."
            })
        }
        const post = req.params.id ? {post: row[0]} : {posts: row}
        res.status(200).json({
            ok: 1,
            status: 200,
            ...post
        })
    } catch (e) {
        next(e)
    }
}

export const edit_post = async (req, res, next) => {
    try {
        const data = matchedData(req)
        const [row] = await pool.query("SELECT * FROM posts WHERE `id`=?", data.post_id)

        if (row.length != 1) {
            return res.json({
                ok: 0,
                status: 404,
                message: "Invalid post ID"
            })
        }
        const post = row[0]
        const date = new Date().toString()
        const title = data.title || post.title
        const content = data.body || post.content
        const author = data.author || post.author
        await pool.execute(
            "UPDATE posts SET `title`=?,`content`=?,`author`=?,`updated_at`=? WHERE `id`=?",
            [title, content, author, date, data.post_id]
        )
        res.json({
            ok: 1,
            status: 200,
            message: "Post Updated Successfully"
        })
    } catch (e) {
        next(e)
    }
}

export const delete_post = async (req, res, next) => {
    try {
        const [result] = await pool.execute(
            "DELETE FROM posts WHERE `id`=?",
            [req.body.post_id]
        );
        if (result.affectedRows) {
            return res.json({
                ok: 1,
                status: 200,
                message: "Post has been deleted successfully.",
            });
        }
        res.status(404).json({
            ok: 0,
            status: 404,
            message: "Invalid post ID.",
        });
    } catch (e) {
        next(e);
    }
}