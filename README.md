# simple-file-upload

Docker container that provides an API endpoint for simple, secure file uploads.

This docker container exposes a single, write-only endpoint at `/upload` that
accepts a single file along with a `token` GET parameter for authentication. The
authentication for the endpoint, along with the location of the uploaded file, 
is configured using environment variables on the container.

You can upload a file with curl like so:

```bash
> curl -XPOST -F 'data=@testuser-file.txt' dockerhost:3000/upload?key=TESTUSER
```

Multiple keys are supported, and every key is a 1:1 mapping to a location on 
disk. Any additional uploads for a key will override the previous upload for
that key. 

The design goals for this container are a secure upload tool that:
1. Can only be used to upload files, not download or read them
2. Can only be used with a matching authentication key
3. Can only upload to a single location per authentication key
4. Can only override the previous upload, not store additional uploads

# How to Use

Basic usage is as follows:

```
docker run \
  -e "KEY_TESTUSER=/uploads/testuser-file.txt" \
  -v /my_local_dir/:/uploads/ \
  -p 3000:3000 \
  twostoryrobot/simple-file-upload
```

This will start the upload server, listening on port 3000. Files that are 
uploaded with the key `TESTUSER` will be placed at `/uploads/testuser-file.txt`.
You can use a volume to get easy access to this file on your host machine, or in
another container.
