const PostSchema = require('../models/Post');
const UserSchema = require('../models/User');
const FriendSchema = require('../models/Friend');
const GroupSchema = require('../models/Group');
const shuffle = require('../utils/shuffle');
const { all } = require('axios');

const postController = async (req, res) => {
	/*
		Controlador de la Ruta para realizar un posteo
	*/

	const { userId, description } = req.body;

	let group = null

	let image;
	let hidden;
	let isMatch;
	let hashtags;
	let title;

	req.body.image ? (image = req.body.image) : (image = null);
	req.body.hidden ? (hidden = req.body.hidden) : (hidden = false);
	req.body.isMatch ? (isMatch = req.body.isMatch) : (isMatch = false);
	req.body.hashtags ? (hashtags = req.body.hashtags) : (hashtags = null);
	req.body.title ? (title = req.body.title) : (title = null);

	if (isMatch) {
		group = await GroupSchema.create({
			title,
			creator: userId,
			users: [userId]
		})
	}

	const post = PostSchema({
		userId,
		description,
		image,
		hidden,
		isMatch,
		hashtags,
	});

	try {
		const newPost = await post.save();
		res.status(200).json(newPost);
	} catch (error) {
		console.log(error)
		res.status(500).json(error);
	}
};

const postCommentController = async (req, res) => {
	/*
		Controlador de la Ruta pora realizar un comentario
	*/

	const { postId, userId, description } = req.body;

	const post = await PostSchema.findOne({
		_id: postId,
	});

	if (post) {
		post.comments.push({
			description: description,
			userId: userId,
			date: Date.now(),
		});
		try {
			const newPost = await post.save();
			res.status(200).json(newPost);
		} catch (error) {
			res.status(500).json(error);
		}
	} else {
		res.status(404).json({ message: 'Post not found' });
	}
};

const recomendedPostController = async (req, res) => {
	/*
		Controlador de la Ruta para obtener publicaciones recomendadas
	*/

	const { userId } = req.params;

	let user = null;

	try {
		user = await UserSchema.findOne({ _id: userId });
	} catch (err) {
		return res.status(500).json(err);
	}

	let userFriendsPosts = [];
	let friendships = [];
	const maxPosts = 10;

	if (user.friends.length > 0) {
		friendships = user.friends.map(async (friend) => {
			return await FriendSchema.findOne({ _id: friend });
		});
	}

	Promise.all(friendships).then((friendships) => {
		userFriendsPosts = friendships.map(async (friendShip) => {
			if (friendShip.status === 3) {
				if (String(friendShip.requester._id) === String(userId)) {
					return await PostSchema.find({ userId: friendShip.recipient._id });
				} else {
					return await PostSchema.find({ userId: friendShip.requester._id });
				}
			}
		});
		Promise.all(userFriendsPosts).then((userFriendsPosts) => {
			userFriendsPosts = shuffle(userFriendsPosts.flat());
			let allPosts = [];
			if (userFriendsPosts.length < maxPosts) {
				allPosts = PostSchema.find({ userId: { $ne: userId } })
					.then((posts) => {
						posts = posts.slice(0, maxPosts - userFriendsPosts.length);
						posts = posts.filter(
							(post) => String(post.userId) !== String(userId)
						);
						posts = userFriendsPosts.concat(posts);
						let hash = {};
						posts = posts.filter((o) =>
							hash[o._id] ? false : (hash[o._id] = true)
						);
						return res.status(200).json(posts);
					})
					.catch((err) => {
						return res.status(500).json(err);
					});
			}
		});
	});
};

const getAllUPost = async (req, res) => {
	/*
		Controlador de la Ruta para obtener todos las publicaciones
	*/
	try {
		const posts = await PostSchema.find();
		res.status(200).json(posts);
	} catch (error) {
		res.status(500).json(error);
	}
};

const getPostsByHashtag = async (req, res) => {
	/*
		Controlador de la Ruta para obtener publicaciones por hashtag
	*/

	const { hashtag } = req.params;

	const posts = await PostSchema.find({ hashtags: hashtag });

	if (posts.length > 0) {
		res.status(200).json(posts);
	} else {
		res.status(404).json({ message: 'Posts not found' });
	}
};

const getPostsByUser = async (req, res) => {

	/*
		Controlador de la Ruta para obtener publicaciones de un usuario
	*/

	const { id } = req.params;

	try {
		const posts = await PostSchema.find({ userId: id });
		res.status(200).json(posts);
	} catch (error) {
		res.status(500).json(error);
	}
};


module.exports = {
	postController,
	postCommentController,
	getAllUPost,
	recomendedPostController,
	getPostsByHashtag,
	getPostsByUser,
};
