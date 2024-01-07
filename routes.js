import {Router} from "express";
import {body, param} from "express-validator";
import {validator, create, show_posts, edit_post, delete_post} from "./Controller.js";

const routes = Router({strict: true})

// Create Data
routes.post(
    "/create",
    [
        body("title", "Must not be empty.").trim().not().isEmpty().escape(),
        body("body", "Must not be empty.").trim().not().isEmpty().escape(),
        body("author", "Must not be empty.").trim().not().isEmpty().escape(),
    ],
    validator,
    create
);

// Read Data
routes.get("/posts", show_posts);
routes.get("/post/:id",
    [
        param("id", "Invalid post ID").exists().isNumeric().toInt()
    ],
    validator,
    show_posts
)

// Update Data
routes.put(
    "/edit", [
        body("post_id", "Invalid post ID").isNumeric().toInt(),
        body("title", "Must not be empty.").optional().trim().not().isEmpty().escape(),
        body("body", "Must not be empty.").optional().trim().not().isEmpty().escape(),
        body("author", "Must not be empty.").optional().trim().not().isEmpty().escape(),
    ],
    validator,
    edit_post
)

// Delete Data
routes.delete(
    "/delete",
    [
        body("post_id", "Please provide a valid post ID.")
            .exists()
            .isNumeric()
            .toInt(),
    ],
    validator,
    delete_post
)

export default routes;
