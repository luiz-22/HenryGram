import React, { useState, useEffect } from 'react';
//import logoUploadImage from "../../../assets/subirImage.png";
import logoUploadImage from '../../../assets/camera.png';
import { uploadImage } from '../../helpers/uploadImage';
import { useSelector } from 'react-redux';
import { editProfileAction } from '../../../redux/actions/index';
import { useDispatch } from 'react-redux';
import { BsPencilSquare } from 'react-icons/bs';
import { RxCross1 } from 'react-icons/rx';

const giftUpload =
	'https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921';

function HeaderProfile({ isFriend, userInformation }) {
	const dispatch = useDispatch();
	const [avatarUser, setAvatarUser] = useState('');
	const [loadingAvatar, setLoadingAvatar] = useState(false);
	const [bannerUser, setBannerUser] = useState('');
	const [loadingBanner, setLoadingBanner] = useState(false);
	const [editHeader, setEditHeader] = useState(false);
	const userId = useSelector((state) => state.userInformation?._id);

	const handleSaveAvatarUser = (e) => {
		uploadImage(e, setLoadingAvatar, null, setAvatarUser)
			.then((res) => {
				dispatch(editProfileAction({
					avatar: res,
					id: userId
				}))
			})
	};
	const handleSaveBannerUser = (e) => {
		uploadImage(e, setLoadingBanner, null, setBannerUser)
			.then((res) => {
				dispatch(editProfileAction({
					banner: res,
					id: userId
				}))
			})
	};

	useEffect(() => {
	}, [userInformation]);

	return (
		<header className="relative h-36">
			<img
				className="w-full h-36 object-cover absolute "
				src={loadingBanner ? giftUpload : bannerUser || userInformation?.banner}
				alt="Portada User"
			/>
			<div className="absolute">
				<img
					className="w-32 h-32 object-cover rounded-full relative ml-5 top-1.5"
					src={
						loadingAvatar ? giftUpload : avatarUser || userInformation?.avatar
					}
					alt="avatar User"
				/>
				{(userInformation._id ===userId) && (
					
					editHeader && (
							<div className="bg-amber-300 w-12 h-12 absolute -bottom-2 -right-2  rounded-full flex items-center justify-center ">
								<label htmlFor="file" className="cursor-pointer">
									<img
										className="w-10 h-10"
										src={logoUploadImage}
										alt="upload image"
									/>
								</label>
								<input
									id="file"
									name="image"
									type="file"
									className="hidden"
									onChange={handleSaveAvatarUser}
								/>
							</div>
						)
				)}
			</div>
			{(userInformation._id ===userId) && (
				
				editHeader && (
						<div className="bg-amber-300 w-16 h-16 absolute right-8 top-4 rounded-full flex items-center justify-center">
						<label htmlFor="file-banner" className="cursor-pointer">
							<img
								className="w-14 h-14 "
								src={logoUploadImage}
								alt="upload image"
							/>
						</label>
					<input
						id="file-banner"
						name="image-banner"
						type="file"
						className="hidden"
						onChange={handleSaveBannerUser}
					/>
				</div>
				)
			)}

			{(userInformation._id ===userId) && (
				<div className="absolute right-3 bottom-3">
					<button className="bg-stone-500 w-fit h-fit py-1 px-2 rounded-md gap-2 flex items-center justify-center" onClick={() => setEditHeader(!editHeader)}>
						<p className='text-sm'>
							{editHeader ? 'Cancelar' : 'Editar'}
						</p>
						{
							editHeader ? <RxCross1 className="w-3 h-3" /> : <BsPencilSquare className="w-3 h-3" />
						}
					</button>
				</div>
			)}
		</header>
	);
}

export default HeaderProfile;
