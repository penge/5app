# 5app

**Challenge:**

[https://github.com/5app/5app-coding-challenge](https://github.com/5app/5app-coding-challenge)

**Solution:**

```
POST https://5mdnjubwya.execute-api.eu-west-2.amazonaws.com/dev/filter
```

**Samples:**

- [sample request](filter/samples/request.json)
- [sample response](filter/samples/request.json)

**Main file:**

[filter/index.js](filter/index.js)


# How I made it

## Main logic

The most important part of this, I found, is to be able to filter the items from
**the payload** as we need, and to keep it simple and customizable.

I made condition `count > 1` a variable so it doesn't have to be always 1 if we need to change it in future.

I also dropped items that don't have a proper logo (within the range of `64x64` and `128x128`).
These dimensions (minimum logo size and maximum logo size) can be customized as well.
If there is more than one logo within the range, I return the smallest one.

In case API would need to express these options via a request in future,
it is ready and only minor updates would be needed, to simply
read the options from the request.

## API

API is simple, only one `POST` endpoint.

An easy way to do is to create one dedicated EC2 instance.
Use Nodejs with Express, copy the code, start the server.
It is not the fastest or coolest way, though.

I have put it to **API Gateway**, but decited not to use Serverless or
maintain environments, none of that was needed.
I also didn't use Express as it was not necessary or didn't use
test library like AVA, Jest, or other.
Used simple Node's **assert** instead.
I put one test in a `__tests__` folder.
That's a convention I would use for test runners.

I developed it in **Cloud 9** and deployed manually via one single click.
This infrastructure is provisioned by **CloudFormation**.
Template is written in **SAM**.

I made sure it's close to you, so I deployed it in London (**eu-west-2**).
The single `POST` endpoint is handled by a **Lambda** (Proxy Integration).
