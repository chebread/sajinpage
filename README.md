# Sajinpage

> Sajinpage (pronounced /sɑdʑin,peɪdʒ/) shares photos and provides an intuitive photo view

## Website link
[sajin.page](https://sajin.page/)

## What's Sajinpage?
Sajinpage can also be similar to image hosting services(Imgur, Giphy, Imgbb, Flickr). However, Sajinpage has differences.

### Sajinpage is exclusive
If you upload an image on Imgur, people around the world can see it. That is, the image is uploaded as public.

However, Sajinpage is exclusive. After you upload a file, only people with a link to the file can view it, and no one can see anyone who doesn't have a link to the file. That is, the image is uploaded privately.

### Sajinpage is safe
If a user uploads a file on Imgbb, the user has no way to know how the file is uploaded and whether the file is safely stored on the server without being abused. Users just should trust Imgbb for no reason.

However, Sajinpage uploads files to Supabase Storage. Absolute files are never exploited. Also, Sajinpage will never read the file, and will access the file only when the user requests deletion from Sajinpage in special cases.

Also, if you upload a photo on Sajinpage after activating restricted mode, no one will be able to see the file if the session of the file is terminated.

### Sajinpage is real-time
Services such as Imgur and Giphy do not support real-time file tracking. The reason is that these services do not have the purpose of posting personal photos.
Sajinpage is a place for posting personal photos only. This is different from other services.

The real-time file tracking function is a mode that applies changes immediately when a file session is terminated or a file is deleted. No other service supports real-time file tracking due to cost and functional issues. This is a special feature that only Sajinpage supports.

## Stacks
- React
- Supabase
- React Router Dom
- Jotai
- React Helmet Async

## License
[MIT LICENSE &copy; 2023 Cha Haneum](.github/LICENSE)