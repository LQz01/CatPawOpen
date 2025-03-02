const {getHtml} = $.require('./_lib.request.js')
const {
    formatPlayUrl,
} = misc;
var rule = {
    title: '木偶[盘]',
    host: 'http://123.666291.xyz',
    url: '/index.php/vod/show/id/fyfilter.html',
    filter_url: '{{fl.cateId}}{{fl.area}}{{fl.by}}{{fl.class}}{{fl.lang}}{{fl.letter}}/page/fypage{{fl.year}}',
    searchUrl: '/index.php/vod/search/page/fypage/wd/**.html',
    filter: 'H4sIAAAAAAACA+2Z228TRxTG3/kz9jmVZx3C7Y074X6/VTwYWLVR0yAlBilCkSiJTS4kJlFqk+JQquZKY+xQSsGWk3/Gu2v/F931jM+e+Vw1bsUDbefR3+/LmZ1vxnt8lIeWbR348qH1jTNsHbDu9CeGhqwuayDxrRN8dCdWvdFU8PlBov++0/QNhHJqrTG6FsrBB2ukS6nZfOBXaqxZKaa0lsUf31T1IovSWhbvu2feo6xuURotNLlWq+ZhIanRQquz7scKLCQ1qkJ7Y1WkRs8y/rxWnoBnkVrLUi+suE9f6xal0bNMFv0qWJTGduTPV9p2FGpkWX7StiOl0eMWVmpbr+BxpUZV0nONhXWoIjWq8vJ1sEeoIrW/cUbe4w0/OwsWqZFldNJ7/ANYpEbRVTJu6gNEJ7WWpbE45z1f1i1Ko4WyT+oTZVhIapTL1ht//je3ugnRkEzGzFL9Z7w1UiPLTNrNvAWL1OjWbD8LjhdujdSik8p7i7N4Uk2NLGPb/i+wdaVRgNVZv5L/s61pZORW+AfyFZAYdBLsDZAvuU/Lnb4BllYbC+nWOmGhmJLotFYWvA9FzaGkKOCS93FLryEl2tPWjPuiqjmURAf+6/foUBIdwNQmOpRENXLLXn5DryEl2suP61hDSdGt+h0dSoqetNT+pCWtxnTJLa/oNaRENcYyQcru+LpehlTa8/K2nyn4Ewv6tkmNXkavvKnt4I/1RUklX+p9rZLVTVLi16k/MfBVdJ3qxUJ97VGn1+lFNfC3FggLxZTEjhEdSqLL8nYJHUqiY8xV3ekcmiKVHXebSUrsyqBDSexitjmkxK5M256lxGJ334zqDinx2IedxGAUu5d738i96zD2uIjvbpUPy8SaAqPdSLs5jSONc2ojtTkVSAWj9n6ggcDoPqT7ON2LdC+ne5Du4bQHaQ+nmJXNs7IxK5tnZWNWNs/KxqxsnpWNWdk8K4FZCZ6VwKwEz0pgVoJnJTArwbMSmJXgWQnMSvCsBGYleFYCsxI8K4FZCZ6VwKwCQXtHOcmkw74ubiHnFac7/LocpK9is0rsIJFDQA4ROQzkMJEjQI4QOQrkKJFjQI4ROQ7kOJETQE4Q6QXSS+QkkJNETgE5ReQ0kNNEzgA5Q+QskLNEzgE5R+Q8kPNELgC5QOQikItELgG5ROQykMtErgC5QuQqkKtErgG5RuQ6kOtEbgC5QeQmkJtExBf7gYUK/wrcHmbdYmbOLWfarn/URMI6t4djyb7A3lqiVi57pXlGv+5LDkWNujjmjqcZHbpzb9AJn+BWlxUPlthlJlAzgZoJ9H89ge76FCNoOhX4/3IE3XFs+xRD6s7jYydj7E7DYQdjbLYUTG7u4k96GVLNMPePhzkziJlBzAxiZhAzg5gZxP4bg1i3Noglkk7v3ehh/M2K+3Kq825fK9Mk1nc3xhpI0EaDXstZ9IrwNlaDH0GcxfWfhqadmnZq2qlpp6admnb6ubfT3bydmsZlGpdpXKZxmcZlGtdn/w+5HtO5TOcynct0LtO5TOf693SukT8A3qOeGs0wAAA=',
    filter_def: {
        1: {cateId: '1'},
        2: {cateId: '2'},
        3: {cateId: '3'},
        4: {cateId: '4'},
        25: {cateId: '25'},
    },
    cate_exclude: '网址|专题|全部影片',
    // tab_rename: {'KUAKE1': '夸克1', 'KUAKE11': '夸克2', 'YOUSEE1': 'UC1', 'YOUSEE11': 'UC2',},
    play_parse: true,
    searchable: 1,
    filterable: 1,
    quickSearch: 0,
    class_name: '电影&剧集&动漫&综艺&纪录片',
    class_url: '1&2&3&4&25',
    // class_parse: async () => {
    // },
    预处理: async () => {
        return []
    },
    推荐: async () => {
        return []
    },
    一级: async function (tid, pg, filter, extend) {
        let {MY_CATE, input} = this;
        let html = (await getHtml(input)).data
        const $ = pq(html)
        let videos = []
        $('.module-items .module-item').each((index, item) => {
            const a = $(item).find('a:first')[0];
            const img = $(item).find('img:first')[0];
            const content = $(item).find('.module-item-text:first').text();
            videos.push({
                "vod_name": a.attribs.title,
                "vod_id": a.attribs.href,
                "vod_remarks": content,
                "vod_pic": img.attribs['data-src']
            })
        })
        return videos
    },
    二级: async function (ids) {
        let {input} = this;
        let html = (await getHtml(input)).data
        const $ = pq(html)
        let vod = {
            "vod_name": $('h1.page-title').text(),
            "vod_id": input,
            "vod_remarks": $('div.video-info-main div:nth-child(4) div.video-info-item').text(),
            "vod_pic": $('.lazyload').attr('data-src'),
            "vod_content": $('p.sqjj_a').text().replace(/【玩偶哥哥】[收起部分]|【玩偶哥哥】|\[收起部分\]/igs,''),
        }
        let playform = []
        let playurls = []
        for (const item of $('.module-row-title')) {
            const a = $(item).find('p:first')[0];
            let link = a.children[0].data.trim()
            if (/pan.quark.cn/.test(link)) {
                const shareData = Quark.getShareData(link);
                if (shareData) {
                    const videos = await Quark.getFilesByShareUrl(shareData);
                    if (videos.length > 0) {
                        playform.push('Quark-' + shareData.shareId);
                        playurls.push(videos.map((v) => {
                            const list = [shareData.shareId, v.stoken, v.fid, v.share_fid_token, v.subtitle ? v.subtitle.fid : '', v.subtitle ? v.subtitle.share_fid_token : ''];
                            return v.file_name + '$' + list.join('*');
                        }).join('#'))
                    } else {
                        playform.push('Quark-' + shareData.shareId);
                        playurls.push("资源已经失效，请访问其他资源")
                    }
                }
            }
            if (/drive.uc.cn/.test(link)) {
                const shareData = UC.getShareData(link);
                if (shareData) {
                    const videos = await UC.getFilesByShareUrl(shareData);
                    if (videos.length > 0) {
                        playform.push('UC-' + shareData.shareId);
                        playurls.push(videos.map((v) => {
                            const list = [shareData.shareId, v.stoken, v.fid, v.share_fid_token, v.subtitle ? v.subtitle.fid : '', v.subtitle ? v.subtitle.share_fid_token : ''];
                            return v.file_name + '$' + list.join('*');
                        }).join('#'))
                    } else {
                        playform.push('UC-' + shareData.shareId);
                        playurls.push("资源已经失效，请访问其他资源")
                    }
                }
            }
            if (/www.alipan.com/.test(link)) {
                const shareData = Ali.getShareData(link);
                if (shareData) {
                    const videos = await Ali.getFilesByShareUrl(shareData);
                    log(videos)
                    if (videos.length > 0) {
                        playform.push('Ali-' + shareData.shareId);
                        playurls.push(videos.map((v) => {
                            const ids = [v.share_id, v.file_id, v.subtitle ? v.subtitle.file_id : ''];
                            return formatPlayUrl('', v.name) + '$' + ids.join('*');
                        }).join('#'))
                    } else {
                        playform.push('Ali-' + shareData.shareId);
                        playurls.push("资源已经失效，请访问其他资源")
                    }
                }
            }
            if(/www.123684.com|www.123865.com|www.123912.com|www.123pan.com|www.123pan.cn|www.123592.com/.test(link)) {
                let shareData = await Pan.getShareData(link)
                let videos = await Pan.getFilesByShareUrl(shareData)
                Object.keys(videos).forEach(it => {
                    playform.push('Pan123-' + it)
                    const urls = videos[it].map(v => {
                        const list = [v.ShareKey, v.FileId, v.S3KeyFlag, v.Size, v.Etag];
                        return v.FileName + '$' + list.join('*');
                    }).join('#');
                    playurls.push(urls);
                })
            }
        }
        vod.vod_play_from = playform.join("$$$")
        vod.vod_play_url = playurls.join("$$$")
        return vod
    },
    搜索: async function (wd, quick, pg) {
        let {input} = this
        let html = (await getHtml(input)).data
        const $ = pq(html)
        let videos = []
        $('.module-items .module-search-item').each((index, item) => {
            const a = $(item).find('a.video-serial:first')[0];
            const img = $(item).find('img:first')[0];
            const content = $(item).find('.video-text:first').text();
            videos.push({
                "vod_name": a.attribs.title,
                "vod_id": a.attribs.href,
                "vod_remarks": content,
                "vod_pic": img.attribs['data-src']
            })
        })
        return videos
    },
    lazy: async function (flag, id, flags) {
        let {input,mediaProxyUrl} = this;
        const ids = input.split('*');
        const urls = [];
        let UCDownloadingCache = {};
        let UCTranscodingCache = {};
        if (flag.startsWith('Quark-')) {
            console.log("夸克网盘解析开始")
            const down = await Quark.getDownload(ids[0], ids[1], ids[2], ids[3], true);
            urls.push("原画", down.download_url + '#fastPlayMode##threads=10#')
            const transcoding = (await Quark.getLiveTranscoding(ids[0], ids[1], ids[2], ids[3])).filter((t) => t.accessable);
            transcoding.forEach((t) => {
                urls.push(t.resolution === 'low' ? "流畅" : t.resolution === 'high' ? "高清" : t.resolution === 'super' ? "超清" : t.resolution, t.video_info.url)
            });
            return {
                parse: 0,
                url: urls,
                header: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
                    'origin': 'https://pan.quark.cn',
                    'referer': 'https://pan.quark.cn/',
                    'Cookie': Quark.cookie
                }
            }
        }
        if (flag.startsWith('UC-')) {
            console.log("UC网盘解析开始");
            if (!UCDownloadingCache[ids[1]]) {
                const down = await UC.getDownload(ids[0], ids[1], ids[2], ids[3], true);
                if (down) UCDownloadingCache[ids[1]] = down;
            }
            const downCache = UCDownloadingCache[ids[1]];
            return await UC.getLazyResult(downCache, mediaProxyUrl)
        }
        if (flag.startsWith('Ali-')) {
            const transcoding_flag = {
                UHD: "4K 超清",
                QHD: "2K 超清",
                FHD: "1080 全高清",
                HD: "720 高清",
                SD: "540 标清",
                LD: "360 流畅"
            };
            console.log("网盘解析开始")
            const down = await Ali.getDownload(ids[0], ids[1], flag === 'down');
            urls.push("原画",down.url+"#isVideo=true##ignoreMusic=true#")
            urls.push("极速原画",down.url+"#fastPlayMode##threads=10#")
            const transcoding = (await Ali.getLiveTranscoding(ids[0], ids[1])).sort((a, b) => b.template_width - a.template_width);
            transcoding.forEach((t) => {
                if(t.url!==''){
                    urls.push(transcoding_flag[t.template_id],t.url);
                }
            });
            return {
                parse: 0,
                url: urls,
                header: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
                    'Referer': 'https://www.aliyundrive.com/',
                },
            }
        }
        if(flag.startsWith('Pan123-')) {
            log('盘123解析开始')
            const url = await Pan.getDownload(ids[0],ids[1],ids[2],ids[3],ids[4])
            urls.push("原画",url)
            let data = await Pan.getLiveTranscoding(ids[0],ids[1],ids[2],ids[3],ids[4])
            data.forEach((item) => {
                urls.push(item.name,item.url)
            })
            return {
                parse: 0,
                url: urls
            }
        }
    },
}
