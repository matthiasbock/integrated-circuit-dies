var v_CW_World_js = 1.0;

// cpu_world.js
function newPicWindow (p_title, p_image, p_w, p_h)
{
	newGenericWindow (p_title, p_image, p_w + 70, p_h + 95, 'CW_Zoom',
		'(c) Copyright 2003 - 2010 Gennadiy Shvets');
}

function newWindow (p_script, p_w, p_h)
{
	var gwin = open (p_script, 'GenericWindow', 'resizable=yes,scrollbars=yes,width=' +
		(p_w + 30) + ',height=' + (p_h + 50));
	if (gwin.opener == null) gwin.opener = self;
}

function newWindow2 (p_script, p_wname, p_w, p_h)
{
	var gwin = open (p_script, p_wname, 'resizable=yes,scrollbars=yes,width=' +
		(p_w + 30) + ',height=' + (p_h + 50));
	if (gwin.opener == null) gwin.opener = self;
}

function newDieWindow (p_title, p_image, p_w, p_h)
{
	newGenericWindow (p_title, p_image, p_w + 70, p_h + 95, 'CW_Die_Zoom',
		'(c) Copyright 2005 - 2007 <A HREF="/info/die_pictures.html">William Blair</A>');
}

function newUploadWindow (p_title, p_image, p_w, p_h)
{
	newGenericWindow (p_title, p_image, p_w + 70, p_h + 95, 'CW_Upload_Zoom',
		'(c) Image is copyrighted by its author');
}

function newPriceChartWindow (p_title, p_image, p_w, p_h)
{
	return newGenericWindow (p_title, p_image, p_w + 70, p_h + 95,
		'CW_PriceChart', '(c) Copyright 2003 - 2010 Gennadiy Shvets');
}

function newGenericWindow (p_title, p_image, p_w, p_h, p_wname, p_copyright)
{
	var CW_PW = open ('', p_wname, 'resizable=yes,scrollbars=yes,width=' +
		p_w + ',height=' + p_h);
	CW_PW.document.write('<HTML><HEAD><TITLE>' + p_title +
		'</TITLE><link rel="stylesheet" href="http://cdn.cpu-world.com/cpu_world2.css" type="text/css"></HEAD>' +
		'<body bgcolor="#FFFFFF" text="#000000">' +
		'<div class="shdw"><div class="shdw2"><div class="cpu_content">' +
		'<div class="yhb"><h1>' + p_title + '</h1></div>' +
		'<div style="padding: 5px; text-align: center; vertical-align: middle"><IMG SRC="' +
		p_image + '" alt="' + p_title + '"></div></div></div></div>' +
		'<div class="shdw"><div class="shdw2"><table class="ft_table">' +
		'<tr><th colspan=2 height="3"><div style="margin-bottom: 3px"></div></th></tr>' +
		'<tr><td><a href="/terms_and_conditions.html">Terms and Conditions</a></td>' +
		'<td align="right">' + p_copyright +
		'</td><tr><th colspan=2 height="3"><div style="margin-bottom: 3px"></div></th></tr>' +
		'</table></div></div></BODY></HTML>');
	CW_PW.document.close();
	return false;
}

var CW_ebay_data = new Array ();
function	UpdateWhereToBuy ()
{

	var text = UpdateDivPrice ('CW_WHERE_TO_BUY', 'CW_where_to_buy',
		"<div class='shdw'><div class='shdw2'>\n" +
		"<h4 class='side_h4a'>Where to buy</h4>\n<div class='side_fbox'>\n",
		"\n</div></div></div>");
	if	(typeof(CW_custom_price) != 'undefined')
	{
		var i;
		var len = CW_custom_price.length;
		for (i = 0; i < len; i += 2)
			UpdateDivPrice (CW_custom_price[i], CW_custom_price[i + 1]);
	}
}

function	AddCustomPrice (p_div, p_var)
{
	CW_custom_price.push (p_div, p_var);
}

function	UpdateDivPrice (p_div, p_var, p_before, p_after)
{
	var div_obj = document.getElementById (p_div);
	if	(div_obj == null)	return;

	var	data_arr;
	eval ("data_arr = (typeof(" + p_var + ") == 'undefined')? null: " + p_var + ";");
	if	(data_arr == null)	return;

	var i, j, label, url, extra;
	if	(p_before == null)	p_before = '';
	var prices = new Array ( p_before );
	var len = data_arr.length;
	var last = '';
	var li = '';
	var title = '';
	var ul = 0;
	for (i = 0; i < len; i += 3)
	{
		url = data_arr[i];
		label = data_arr[i + 1];
		if	(label == 'TigerDirect.com')  continue;
		if	(label == 'Amazon.com')  continue;
		if	(label == 'Search on eBay')  continue;
		extra = data_arr[i + 2];
		if (url == '')
		{
			if	(li != '')
			{
				prices.push ('<li>' + li + '</li>');
				last = '';
				li = '';
			}
			if	(ul)
			{
				prices.push ("</ul>", "<br>");
				ul = 0;
			}
			title = label;
		}
		else
		{
			if	(title != '')
			{
				prices.push (title);
				title = '';
			}
			if	(ul == 0)
			{
				prices.push ("<ul style='margin: 0; padding-left: 20px; line-height: 200%'>");
				ul = 1;
			}
			if	(label != last)
			{
				if	(li != '')
				{
					prices.push('<li>' + li + '</li>');
					li = '';
				}
				last = label;
			}
			else
				li += '<br>';

			if	(url.search(/^EBAY(\d)$/) != -1)
			{
				j = parseInt(RegExp.$1) - 1;
				CW_ebay_data[j] = extra;
				li += '<a href="#" onClick="CW_JSFunctionOn(event, 600, 350, ShowEbayDialog, ' +
					j + '); return false" rel="nofollow">' + label + '</a>';
			}
			else
				li += '<a href="' + url + '" target="_blank" rel="nofollow">' +
					label + "</a> " + extra;
		}
	}
	if	(li != '')	prices.push('<li>' + li + '</li>');
	if	(prices.length < 2)		return;
	if	(p_after == null)	p_after = '';
	prices.push ('</ul>', p_after);

	div_obj.innerHTML = prices.join("\n");
}

function ShowEbayDialog (p_args)
{
	var arr = CW_ebay_data[p_args];
	var ma = arr[0];
	var fa = arr[1];
	var mo = arr[2];
	var pn = arr[3];
	var ss = arr[4];
	var qs = arr[5];

	var links = 0;
	var text = "<h3>eBay search</h3>";
	if	(mo != '')
	{
		text += "<p><a href='http://rover.ebay.com/rover/1/711-53200-19255-0/1?icep_ff3=9&amp;pub=5574837557&amp;toolid=10001&amp;campid=5336350642&amp;customid=&amp;icep_uq=" + encodeURIComponent(ma) + "+" + encodeURIComponent(mo) + "&amp;icep_sellerId=&amp;icep_ex_kw=&amp;icep_sortBy=15&amp;icep_catId=&amp;icep_minPrice=&amp;icep_maxPrice=&amp;ipn=psmain&amp;icep_vectorid=229466&amp;kwid=902099&amp;mtid=824&amp;kw=lg' target='_blank' rel='nofollow'>Search for manufacturer name and model number " + mo + "</a>" +
			"<div class='smaller' style='padding-left: 10px'>Model numbers is the most common way for most eBay sellers to describe their items, therefore searching by model number usually results in the most complete list of items for sale.</div>";
		links++;
	}
	if	(ss != '')
	{
		text += "<p><a href='http://rover.ebay.com/rover/1/711-53200-19255-0/1?icep_ff3=9&amp;pub=5574837557&amp;toolid=10001&amp;campid=5336350642&amp;customid=&amp;icep_uq=" + encodeURIComponent(ma) + "+" + encodeURIComponent(ss) + "&amp;icep_sellerId=&amp;icep_ex_kw=&amp;icep_sortBy=15&amp;icep_catId=&amp;icep_minPrice=&amp;icep_maxPrice=&amp;ipn=psmain&amp;icep_vectorid=229466&amp;kwid=902099&amp;mtid=824&amp;kw=lg' target='_blank' rel='nofollow'>Search for production S-spec number(s)</a>" +
			"<div class='smaller' style='padding-left: 10px'>Use this search to locate poorly listed items, where the seller provides only S-spec number, and no model number of the chip.</div>";
		links++;
	}
	if	(qs != '')
	{
		text += "<p><a href='http://rover.ebay.com/rover/1/711-53200-19255-0/1?icep_ff3=9&amp;pub=5574837557&amp;toolid=10001&amp;campid=5336350642&amp;customid=&amp;icep_uq=" + encodeURIComponent(ma) + "+" + encodeURIComponent(qs) + "&amp;icep_sellerId=&amp;icep_ex_kw=&amp;icep_sortBy=15&amp;icep_catId=&amp;icep_minPrice=&amp;icep_maxPrice=&amp;ipn=psmain&amp;icep_vectorid=229466&amp;kwid=902099&amp;mtid=824&amp;kw=lg' target='_blank' rel='nofollow'>Search for QDF# (sample / Q-spec) number(s)</a>" +
			"<div class='smaller' style='padding-left: 10px'>This search is useful if you're looking for qualification and/or engineering samples of the chip.</div>";
		links++;
	}
	if	(pn != '')
	{
		text += "<p><a href='http://rover.ebay.com/rover/1/711-53200-19255-0/1?icep_ff3=9&amp;pub=5574837557&amp;toolid=10001&amp;campid=5336350642&amp;customid=&amp;icep_uq=" + encodeURIComponent(ma) + "+" + encodeURIComponent(pn) +"&amp;icep_sellerId=&amp;icep_ex_kw=&amp;icep_sortBy=15&amp;icep_catId=&amp;icep_minPrice=&amp;icep_maxPrice=&amp;ipn=psmain&amp;icep_vectorid=229466&amp;kwid=902099&amp;mtid=824&amp;kw=lg' target='_blank' rel='nofollow'>Search for manufacturer name and part number(s)</a><div class='smaller' style='padding-left: 10px'>";
		if	(mo != '')
		{
			if	(ma == 'Intel')
				text += "Search by part number is not very effective for modern Intel chips, but we provide it just in case.";
			else if	(ma == 'AMD')
				text += "Search by part number is useful for specific AMD part number, i.e. CPU with specific characteristics and core stepping.";
			else
				text += "Search by part number may be less effective than search by model number. Use it if the search by model number doesn't return any results.";
		}
		else
			text += "Search by part number is a hit or miss. It may work well for part numbers, that match markings on the chip, but could be useless for all others part numbers.";
		text += "</div>";
		if	((links == 0)&&(ma.match(/ /)))
		{
			text += "<p><a href='http://rover.ebay.com/rover/1/711-53200-19255-0/1?icep_ff3=9&amp;pub=5574837557&amp;toolid=10001&amp;campid=5336350642&amp;customid=&amp;icep_uq=" + encodeURIComponent(pn) +"&amp;icep_sellerId=&amp;icep_ex_kw=&amp;icep_sortBy=15&amp;icep_catId=&amp;icep_minPrice=&amp;icep_maxPrice=&amp;ipn=psmain&amp;icep_vectorid=229466&amp;kwid=902099&amp;mtid=824&amp;kw=lg' target='_blank' rel='nofollow'>Search for part number(s) only</a>" +
					"<div class='smaller' style='padding-left: 10px'>Some eBay sellers do not like using long manufacturer names, like National Semiconductor, and they may abbreaviate the name, therefore looking only for part number(s) may return more results.</div>";
		}
	}
	text += "<p class='smaller'>If eBay search does not return any items then check the 'Include description' checkbox on the eBay search page, and repeat the search";

	return WrapDialog(text);
}

function WrapDialog (p_text)
{
	return "<div style='border: 0; padding: 5px; background: url(/Images/back_t50.png)'>" +
		"<div style='border: 2px solid #C0C0C0; padding: 5px; background-color: #FFFFFF; text-align: left'>" +
		((p_text.match (/^ERROR:/))? "<div class='error'>" + p_text + "</div>": p_text) +
		"<form><p align='center'><input type='button' name='ACTION' value='Close' onClick='CW_TimerOff()' class='ibutton'></form>" +
		"</div></div>";
}

SetOnload(UpdateWhereToBuy);

var CW_defer_images = new Array ();
function	DeferImageLoading ()
{
	var imgs = document.getElementsByTagName('img');
	var i, img, y1, y2, parent;
	var y1w = document.body.scrollTop - 10;
	var y2w = y1w + document.body.clientHeight + 20;
	var len = imgs.length;
	for (i = 0; i < len; i++)
	{
		img = imgs[i];
		if	((img.width == null)||(img.height == null))  continue;
		y1 = img.offsetTop;
		parent = img.offsetParent;
		while (parent != null)
		{
			y1 += parent.offsetTop - parent.scrollTop;
			parent = parent.offsetParent;
		}
		y2 = y1 + img.offsetHeight;
		if	((y2 >= y1w)&&(y1 <= y2w))	continue;

		img.setAttribute('src_orig', img.src);
		img.removeAttribute('src');
		CW_defer_images.push (img);
	}

	window.onscroll = CheckDeferedImages;
}

function CheckDeferedImages ()
{
	var len = CW_defer_images.length;
	if	(len == 0)	return;
	var i, y1, y2, img, parent;
	var y1w = document.body.scrollTop - 10;
	var y2w = y1w + document.body.clientHeight + 20;
	for (i = 0; i < len; i++)
	{
		img = CW_defer_images[i];
		y1 = img.offsetTop;
		parent = img.offsetParent;
		while (parent != null)
		{
			y1 += parent.offsetTop - parent.scrollTop;
			parent = parent.offsetParent;
		}
		y2 = y1 + img.offsetHeight;
		if	((y2 < y1w)||(y1 > y2w))	continue;
		img.setAttribute('src', img.getAttribute('src_orig'));
		img.removeAttribute('src_orig');
		CW_defer_images.splice (i, 1);
		len--;
		i--;
	}
}

//SetOnload(DeferImageLoading);

function	OnOff ()
{
	var i, obj, field, visible2;
	var visible = 1;
	var len = arguments.length;
	for (i = 0; i < len; i++)
	{
		field = arguments[i];
		if	(field == '')
		{
			visible--;
			continue;
		}
		obj = document.getElementById (field);
		if	(obj == null)	continue;
		visible2 = (visible < 0)?
			((obj.style.display == 'none')? 1: 0): visible;
		obj.style.display = (visible2)?
			((obj.nodeName.match(/^(SPAN|TABLE|TBODY|TR)$/))? '': 'block'): 'none';
	}
	return false;
}

function	SetupSearch ()
{
	document.TOP_F_SE.SEARCH.value = ' Search ';
	document.TOP_F_SE.SEARCH.style.color = '#D0D0D0';
	document.TOP_F_ID.PART.value = ' Identify ';
	document.TOP_F_ID.PART.style.color = '#D0D0D0';
	if	(CW_cookie_status != -1)
	{
		var state = GetCookie('SE');
		if	(state == 'I')
		{
			OnOff("TOP_ID", "", "TOP_SE");
			document.getElementById("TOP_RI").checked = true;
		}
	}
}

function	SetupFilter ()
{
	var obj = document.getElementById('CW_FILTER');
	if	(obj == null)	return;
	obj.value = ' Filter ';
	obj.style.color = '#D0D0D0';
}

function SwSearch (p_type)
{
	if	(p_type == 'S')
		OnOff("TOP_SE", "", "TOP_ID");
	else
		OnOff("TOP_ID", "", "TOP_SE")
	SetCookie ('SE', p_type, 365);
}

var CW_cookie_status = 1;
var CW_last_visit;

function GetCookie (p_name)
{

	if	(CW_cookie_status == -1)	return '';
	var c = document.cookie;
	var start = c.indexOf (p_name + '=');
	if	(start == -1)	return '';
	var len = start + p_name.length + 1;
	var end = c.indexOf (";", len);
	if	(end == -1)		end = c.length;
	return unescape (c.substring (len, end));
}

function SetCookie (p_name, p_value, p_days)
{

	if	(CW_cookie_status == -1)	return;
	var exp_date = new Date();
	exp_date.setTime (exp_date.getTime () + p_days * 86400000);
	var expires = exp_date.toGMTString ();
	document.cookie = p_name + "=" + escape (p_value) +
		"; expires=" + expires + "; path=/";
}

//	See if the browser accepts cookies
if	(GetCookie ('XX') == "")
{
	SetCookie ('XX', 'OK', 1);
	if	(GetCookie ('XX') != "OK")
		CW_cookie_status = -1;
}
if	(CW_cookie_status != -1)
	SetVisitTime();

function	SetVisitTime ()
{

	if	(CW_cookie_status == -1)	return;
	var current_date = new Date();
	var l_now = parseInt (current_date.getTime () / 1000);

	// Find out when the user visited us the last two times
	var l_last = GetCookie ('LV1');
	l_last = (l_last == '')? l_now: parseInt (l_last);
	var l_last2 = GetCookie ('LV2');
	l_last2 = (l_last2 == "")? l_now: parseInt (l_last2);

	// Determine what time to use as the last visit time - if the last time
	// is less than one hour ago then use the time before the last time
	if	(l_now > (l_last + 3600))
	{
		CW_last_visit = l_last;
		l_last2 = l_last;
	}
	else
		CW_last_visit = l_last2;
	l_last = l_now;
	// Save updated visit times
	SetCookie ('LV1', l_last, 365);
	SetCookie ('LV2', l_last2, 365);
}

var CW_data_onload = new Array ();
var CW_onload_initialized = 0;
function	SetOnload (p_func)
{

	if	(window.addEventListener)
		window.addEventListener("load", p_func, false);
	else if (window.attachEvent)
		window.attachEvent ("onload", p_func);
	else
	{
		if	(!CW_onload_initialized)
		{
			if	(window.onload)
				CW_data_onload.push(window.onload);

			if	((window.onload_cw == null)&&(window.onload != null))
				window.onload_cw = window.onload;
			// Assign new onload function
			window.onload = ProcessOnload;
		}
		CW_onload_initialized = 1;
		CW_data_onload.push (p_func);
	}
}

function	ProcessOnload ()
{

	var len = CW_data_onload.length;
	for (var i = 0; i < len; i++)
	{
		CW_data_onload[i]();
	}
	CW_data_onload.length = 0;
}

var W_delay = 500;
var	W_function;
var	W_timeout_id;
var	W_obj;
var	W_filter_last;

function	Watching_Start (p_event, p_obj, p_function, p_delay)
{
	W_obj = p_obj;
	W_function = p_function;
	W_delay = (p_delay == null)? 500: p_delay;
	p_obj.onkeyup = Watching_ResetTimer;
	p_obj.onkeydown = Watching_ResetTimer;
	Watching_ResetTimer ();
	W_filter_last = p_obj.value;
}

function	Watching_Stop (p_event, p_obj, p_function)
{
	p_obj.onkeyup = null;
	p_obj.onkeydown = null;
	if	(W_timeout_id)		window.clearTimeout (W_timeout_id);
	W_timeout_id = null;
	if	(p_function != null)
		p_function (p_event);
}

function	Watching_ResetTimer ()
{
	if	(W_timeout_id)	window.clearTimeout (W_timeout_id);
	W_timeout_id = window.setTimeout(Watching_Timeout, W_delay);
}

function	Watching_Timeout ()
{
	W_timeout_id = null;
	var value = W_obj.value;
	if	((W_filter_last == null)||(W_filter_last != value))
		W_function (W_obj.id, value);
	W_filter_last = value;
}

// gs_links.js
// Dynamic Link builder script
// Copyright 2007 Gennadiy Shvets
// The program is distributed under the terms of the GNU General
// Public License 3.0

var L_urlPrefix = '';
var L_allLinks2 = new Array (
'ABM', '/Glossary/A/Advanced_Bit_Manipulation.html',
'AMD64', '/Glossary/A/AMD64_technology.html',
'AUTOHALT_MODE', '/Glossary/A/Auto_Halt_Power_Down_state.html',
'CLOCK_MULT', '/Glossary/B/Bus_clock_multiplier.html',
'COOLCORE', '/Glossary/C/CoolCore_technology.html',
'CORE_NAME', '/Glossary/C/Core_name.html',
'CORE_STEP', '/Glossary/C/Core_stepping.html',
'DDA', '/Glossary/D/Dual_Dynamic_Acceleration.html',
'DEEP_SLEEP_MODE', '/Glossary/D/Deep_Sleep_state.html',
'DEEPER_SLEEP', '/Glossary/D/Deeper_Sleep_state.html',
'DPD', '/Glossary/D/Deep_Power_Down_state.html',
'DUAL_DYN_POWER', '/Glossary/D/Dual_dynamic_power_management.html',
'DYN_CACHE_SIZING', '/Glossary/D/Dynamic_Cache_Sizing.html',
'DYN_FSB_FREQ', '/Glossary/D/Dynamic_FSB_Frequency_Switching.html',
'EM64T', '/Glossary/E/Extended_Memory_64_technology_(EM64T).html',
'ENH_DEEPER_SLEEP', '/Glossary/E/Enhanced_Deeper_Sleep_state.html',
'ENH_POWERNOW', '/Glossary/E/Enhanced_PowerNow_technology.html',
'ENH_SSTEP', '/Glossary/E/Enhanced_SpeedStep_technology.html',
'EVP_XD', '/Glossary/E/EVP_XD.html',
'FREQ', '/Glossary/C/CPU_Frequency.html',
'FSB', '/Glossary/F/Front_Side_Bus_(FSB).html',
'HTRANSPORT', '/Glossary/H/HyperTransport_technology.html',
'HTT', '/Glossary/H/Hyper-Threading_technology.html',
'IDA', '/Glossary/D/Dynamic_Acceleration_technology.html',
'INDEP_DYN_CORE', '/Glossary/I/Independent_dynamic_core_technology.html',
'L1', '/Glossary/L/Level_1_cache.html',
'L2', '/Glossary/L/Level_2_cache.html',
'MIN_MAX_POWER', '/Glossary/M/Minimum_Maximum_power_dissipation.html',
'MIN_MAX_TEMP', '/Glossary/M/Minimum_Maximum_operating_temperatures.html',
'MODELN', '/Glossary/P/Processor_Model_number.html',
'SLEEP_MODE', '/Glossary/S/Sleep_state.html',
'SSE4', '/Glossary/S/SSE4.html',
'SSE41', '/Glossary/S/SSE4.1.html',
'SSE42', '/Glossary/S/SSE4.2.html',
'SSE4A', '/Glossary/S/SSE4a.html',
'SSPEC', '/Glossary/S/Specification_(S-Spec)_number.html',
'SSTEP', '/Glossary/S/SpeedStep_technology.html',
'STOP_GRANT_MODE', '/Glossary/S/Stop_Grant_state.html',
'TDP', '/Glossary/T/Thermal_Design_Power_(TDP).html',
'TBT', '/Glossary/T/Turbo_Boost_Technology.html',
'UVD', '/Glossary/U/Unified_Video_Decoder_engine.html',
'VCE', '/Glossary/V/Video_Codec_Engine_VCE.html',
'VCORE', '/Glossary/C/Core_voltage.html',
'VT', '/Glossary/V/Virtualization_Technology.html',
'bc_(\\d+)_(\\d+)', 'javascript:return CW_AJAXOn(event, "/cgi-bin/ajax/bench_parts.pl?s=bc_info&amp;p=$1&amp;mo=$2",500,400)',
'cc_(\\d+)', 'javascript:return CW_AJAXOn(event, "/cgi-bin/ajax/bench_parts.pl?s=cc_info&amp;p=$1",350,400)'
);

var L_text2Link = new Object ();
var L_dyn_links = new Array ();

function L_findLinks ()
{

	var all_links = (typeof (L_allLinks) == 'undefined')? L_allLinks2: L_allLinks;
	var i;
	if	(typeof (L_allLinksAdd) != 'undefined')
		all_links = all_links.concat (L_allLinksAdd);
	// Copy all data to associative array
	var len = all_links.length;
	var url;
	var last_url = '';
	for (i = 0; i < all_links.length; i += 2)
	{
		s = all_links[i];
		url = all_links[i + 1];
		if	(s.match(/\(/))
			L_dyn_links.push (new RegExp('^' + s + '$'), url);
		else
		{
			if	(url != '*')		last_url = url;
			L_text2Link[s] = last_url;
		}
	}
	// Loop through all DIV and SPAN tags on the page

	var tags = (typeof (L_searchTags) != 'undefined')?
		L_searchTags: new Array ('DIV', 'SPAN');
	for (i = 0; i < tags.length; i++)
	{
		L__processElements (tags[i]);
	}
	// Free memory
	L_text2Link = null;

	if	(window.onload_gsl_saved)
		window.onload_gsl_saved();
}

function L__processElements (p_type)
{

	var array = document.getElementsByTagName(p_type);
	if	(array == null)  return;
	var cl, cl_a, one_el, text, url, a, len, j;
	var prefix = (typeof (L_urlPrefix) == 'undefined')? '': L_urlPrefix;
	var many_ids = (typeof (L_multipleIds) == 'undefined')? 0: L_multipleIds;
	var same_win = (typeof (L_sameWindow) == 'undefined')? '': L_sameWindow;
	same_win = (same_win)? "": " target='_blank'";
	if	(many_ids)
	{
		for (var i = 0; i < array.length; i++)
		{
			one_el = array[i];
			cl = one_el.className;
			if	(!cl.match(/^_link(\s+|$)/))  continue;
			a = one_el.innerHTML.split(/\s*<br>\s*/i);
			len = a.length;
			for (j = 0; j < len; j++)
			{
				text = a[j].replace(/<[^>]+>/g, '');
				text = text.replace(/&nbsp;/g, '');
				url = L_text2Link[text];
				if	(url == null)  continue;
				url.replace(/ /g, '%20');
				a[j] = '<a href="' + prefix + url + '"' + same_win + '>' + a[j] + '</a>';
			}
			one_el.innerHTML = a.join('<br>');
		}
	}
	else
	{
		var dyn_len = L_dyn_links.length;
		for (var i = 0; i < array.length; i++)
		{
			one_el = array[i];
			cl = one_el.className;
			if	(cl.search(/^(_link\w?)(\s+|$)/) == -1)	continue;
			cl_a = RegExp.$1;
			text = cl.replace(/^_link\w?\s*/, '');
			text = text.replace(/^[^\s_]\S+\s*/, '');
			if	(text)
				text = text.replace(/^_/, '');
			else
			{
				text = one_el.innerHTML.replace(/<[^>]+>/g, '');
				text = text.replace(/&nbsp;/g, '');
			}
			url = L_text2Link[text];
			if	(url == null)
			{
				// Match dynamic links
				for (j = 0; j < dyn_len; j += 2)
				{
					re = L_dyn_links[j];
					if	(text.match (re))
					{
						url = text.replace(re, L_dyn_links[j + 1]);
						break;
					}
				}
			}
			if	(url == null)  continue;
			url.replace(/ /g, '%20');
			one_el.innerHTML = (url.match(/^javascript:/))?
				"<a href='#' class='" + cl_a + "' onClick='" + url + "; return false'" + same_win + ">" + one_el.innerHTML + '</a>':
				"<a href='" + prefix + url + "' class='" + cl_a + "'" + same_win + ">" + one_el.innerHTML + '</a>';
		}
	}
}

SetOnload(L_findLinks);

//
//	Tabs - based on http://akrabat.com/dynamic-javascript-tabs/
//
function getChildrenByClass(p_parent, p_class)
{
	var result = new Array();
	var pattern = new RegExp("\\b" + p_class + "\\b");

	var els = p_parent.getElementsByTagName('*');
	for	(var i = 0; i < els.length; i++)
	{
		if	(els[i].className.search(pattern) != -1)
			result.push(els[i]);
	}
	return result;
}

function TabsBuild(p_id, p_n)
{
	var i, th, title, tabElement, li, tabLink;

	// assume that if document.getElementById exists, then this will work...
	if(! eval('document.getElementById') ) return;

	var tabContainer = document.getElementById(p_id);
	if	(tabContainer == null)	return;

	var tabContents = getChildrenByClass(tabContainer, 'tab-content');
	if(tabContents.length == 0)
		return;
	var div = document.createElement("div");
	div.className = 'tab-header';
	div.id = p_id + '-header';
	var ul = document.createElement("ul");
	ul.className = 'tab-list';

	tabContainer.insertBefore(div, tabContents[0]);
	div.appendChild(ul);

	for(i = 0; i < tabContents.length; i++)
	{
		th = getChildrenByClass(tabContents[i], 'tab');
		if	(th == null)	continue;
//		title = th[0].childNodes[0].nodeValue;
		title = th[0].innerHTML;
		title = title.replace (/<[^>]*>/g, '');

		// create the tabs as an unsigned list
		li = document.createElement("li");
		li.id = p_id + '-tab-' + i;
		ul.appendChild(li);

		tabLink = document.createElement("a");
		tabLink.className = "tab-item";
		tabLink.setAttribute("href","javascript://");
		tabLink.setAttribute( "title", th[0].getAttribute("title"));
		tabLink.onclick = new Function ("TabsActivate('" + p_id + "', " + i + ")");

		li.appendChild(tabLink);
		tabLink.appendChild(document.createTextNode(title));

		th[0].style.display = 'none';
	}

	TabsActivate (p_id, p_n);
}

function TabsActivate(p_id, p_n)
{
	var tabContainer = document.getElementById(p_id);
	if	(tabContainer == null)	return;

	var tabContents = getChildrenByClass(tabContainer, 'tab-content');
	if(tabContents.length == 0)	return;
	var i;
	for(i = 0; i < tabContents.length; i++)
		tabContents[i].style.display = "none";

	tabContents[p_n].style.display = "block";

	tabList = document.getElementById(p_id + '-list');
	tabs = getChildrenByClass(tabContainer, 'tab-item');
	if(tabs.length > 0)
	{
		for(i = 0; i < tabs.length; i++)
			tabs[i].className = "tab-item";

		tabs[p_n].className = "tab-item tab-active";
		tabs[p_n].blur();
	}

	if	(typeof(TAB_current) != 'undefined')
		TAB_current = p_n;
}

function TabsInit () {	
	var n = (typeof(TAB_current) == 'undefined')? 0: TAB_current;
	TabsBuild('tab-container', n);
}

SetOnload (TabsInit);
if	(document.cw_setup_filter)	SetOnload(SetupFilter);

// cpu_world_ajax.js

var CW_ie4 = (document.all)? 1: 0;
var CW_opa = ((CW_ie4)&&(navigator.userAgent.indexOf('Opera') != -1))? 1: 0;
var CW_ffx = (document.getElementById)? 1: 0;
var CW_ns4 = (document.layers)? 1: 0;
var CW_ns6 = ((CW_ffx)&&(!document.all))? 1: 0;

var CW_timer_id;
var CW_timer_on = 0;
var CW_AJAX_url;
var CW_AJAX_params = '';
var CW_AJAX_params2 = '';
var CW_div_w = '';
var CW_div_h = '';
var CW_div_visible = 0;
var CW_div_initialized = 0;
var CW_div_id;
var CW_show_delay = 1000;
var CW_div_onload = 0;

function CW_DivShow (p_event, p_div, p_xoff, p_yoff, p_adjust)
{
	CW_DivPosition (p_event, p_div, p_xoff, p_yoff, p_adjust);
	CW_DivMakeVisible (p_div);
}

function CW_DivHide (p_div)
{
	var obj;

	if (CW_ffx)
	{
		obj = document.getElementById(p_div);
		if	(obj != null)
			obj.style.display = "none";
		return;
	}
	if (CW_ie4)
	{
		obj = document.all[p_div];
		if	(obj != null)
			obj.style.visibility = "hidden";
		return;
	}
	if (CW_ns4)
	{
		obj = document.layers[p_div];
		if	(obj != null)
			obj.visibility = "hide";
	}
}

function CW_DivPosition(p_event, p_div, p_xoff, p_yoff, p_adjust)
{
	var posx;
	var posy;

	var coords = new Object();
	CW_MouseXY (p_event, coords);
	var posx = coords.x;
	var posy = coords.y;

	if	(p_xoff != null) posx += p_xoff;
	if	(p_yoff != null) posy += p_yoff;

	var obj;
	if (CW_ns4)
	{
		obj = document.layers[p_div];
		obj.top = posy;
		obj.left = posx;
	}
	else
	{
		// Do something with this information
		if ((CW_ffx)||(!CW_ie4))
		{
			obj = document.getElementById(p_div);
		}
		else
		{
			obj = document.all[p_div];
		}
		var obj_parent = obj.offsetParent;
		while (obj_parent != null)
		{
			posx -= obj_parent.offsetLeft;
			posy -= obj_parent.offsetTop;
			obj_parent = obj_parent.offsetParent;
		}

		// Adjust position so it doesn't go outside of the screen
		if	(p_adjust)
		{
			var maxw = (document.body.clientWidth ||
				document.documentElement.clientWidth || window.innerWidth) -
				obj.offsetWidth - 5 + document.body.scrollLeft;
			var maxy = (document.body.clientHeight ||
				document.documentElement.clientHeight || window.innerHeight) -
				5 + document.body.scrollTop;
			var maxh = maxy - obj.offsetHeight;
			if	(p_adjust == 1)
			{
				if	(posx > maxw)	posx = maxw;
				if	(posx < 0)	posx = 0;
				if	(posy > maxh)	posy = maxh;
				if	(posy < 0)	posy = 0;
			}
			else
			{
				var i = maxy - posy - 1;
				if	((i > 0)&&(i < obj.offsetHeight))
				{
					if	(i < 20)	i = 20;
					if	(p_adjust > 2)
						i -= p_adjust;
					obj.style.height = i + 'px';
				}
			}
		}

		obj.style.top = posy + 'px';
		obj.style.left = posx + 'px';
	}
}

function CW_MouseXY (p_event, p_coord)
{
	var posx, posy;

	if	((p_event == null)||(!p_event))
	{
		posx = 0;
		posy = 0;
	}
	else if	((!CW_ie4)&&((p_event.pageX)||(p_event.pageY)))
	{
		posx = p_event.pageX;
		posy = p_event.pageY;
	}
	else
	{
		if (CW_ns4 || CW_ns6)
		{
			posx = p_event.clientX + window.scrollX;
			posy = p_event.clientY + window.scrollY;
		}
		else if (CW_opa)
		{
			posx = window.event.clientX + document.documentElement.scrollLeft;
			posy = window.event.clientY + document.documentElement.scrollTop;
		}
		else
		{
			posx = window.event.clientX + document.documentElement.scrollLeft +
				document.body.scrollLeft;
			posy = window.event.clientY + document.documentElement.scrollTop +
				document.body.scrollTop;
		}
	}

	p_coord.x = posx;
	p_coord.y = posy;
}

function CW_DivMakeVisible(p_div)
{

	var obj;
	if (CW_ns4)
	{
		obj = document.layers[p_div];
		obj.visibility = "show";
	}
	else
	{
		// Do something with this information
		if ((CW_ffx)||(!CW_ie4))
		{
			obj = document.getElementById(p_div);
			obj.style.display = "block";
		}
		else
		{
			obj = document.all[p_div];
			obj.style.visibility = "visible";
		}
	}
}

function CW_DivInitialize(p_div, p_url, p_params, p_delay)
{
	CW_div_id = p_div;
	CW_AJAX_url = p_url;
	CW_AJAX_params = p_params;
	if	(p_delay != null)
		CW_show_delay = p_delay;
	if	(CW_div_id)
	{
		CW_div_initialized = 1;
		document.onmousemove = CW__DivMoveCursor;
	}
	if	(CW_div_onload)
		CW__DivUp();
}

function CW__DivUp ()
{
	if	(CW_div_id == null)
		return;

	// Make p_div a child of the main document
	var obj = document.getElementById(CW_div_id);
	if	((obj != null)&&(obj.parentNode != null)&&(document.body))
	{
		var obj_parent = obj.parentNode;
		if	(obj_parent != document.body)
		{
			obj_parent.removeChild(obj);
			document.body.appendChild(obj);
		}
	}
}

function CW_DivOnload ()
{
	CW_div_onload = 1;
	if	(CW_div_id != null)
		CW__DivUp();

	if	(window.onload_CW_div_saved)
		window.onload_CW_div_saved();
}

function CW_TimerOn (p_event, p_params, p_w, p_h, p_delay)
{
	if	(CW_div_initialized == 0)
	{
		CW_CreateOnDiv(p_params);
		document.onmousemove = CW__DivMoveCursor;
	}
	else
		CW_AJAX_params2 = (p_params == null)? '': p_params;
	if	(CW_timer_on)
		clearTimeout(CW_timer_id);
	if	(p_delay == null)	p_delay = CW_show_delay;
	CW_div_w = (p_w == null)? 0: p_w;
	CW_div_h = (p_h == null)? 0: p_h;
	CW_timer_id = setTimeout('CW_DivTimer()', p_delay);
	CW_DivPosition(p_event, CW_div_id, 10, 10);
	CW_timer_on = 1;
}

function CW_AJAXOn (p_event, p_params, p_w, p_h)
{
	if	(CW_div_initialized == 0)
		CW_CreateOnDiv(p_params);
	else
		CW_AJAX_params2 = (p_params == null)? '': p_params;
	if	(CW_timer_on)
	{
		clearTimeout(CW_timer_id);
		CW_timer_on = 0;
	}
	CW_div_w = (p_w == null)? 0: p_w;
	CW_div_h = (p_h == null)? 0: p_h;
	CW_DivPosition(p_event, CW_div_id, 10, 10);
	CW_DivTimer();

	return false;
}

function CW_JSFunctionOn (p_event, p_w, p_h, p_function)
{
	if	(CW_div_initialized == 0)
		CW_CreateOnDiv('');
	if	(CW_timer_on)
	{
		clearTimeout(CW_timer_id);
		CW_timer_on = 0;
	}
	var pw_div = document.getElementById(CW_div_id);
	if	(pw_div == null)	return;
	if	((p_w != null)&&(p_w != 0))
		pw_div.style.width = p_w;
	if	((p_h != null)&&(p_h != 0))
		pw_div.style.height = p_h;

	var len = arguments.length;
	var f_args = new Array ();
	var i;
	for (i = 4; i < len; i++)
		f_args.push (arguments[i]);
	pw_div.innerHTML = p_function (f_args);
	CW_DivMakeVisible(CW_div_id);
	CW_DivPosition(p_event, CW_div_id, 10, 10, 1);
	CW_div_visible = 1;
}

function CW_CreateOnDiv (p_params)
{

	var cw_div = document.getElementById ('CW_DIV');
	if	(cw_div == null)
	{
		cw_div = document.createElement('div');
		cw_div.id = 'CW_DIV';
		cw_div.zIndex = 10;
		cw_div.style.position = 'absolute';
		cw_div.style.display = 'none';
		cw_div.style.height = 'auto';
		cw_div.style.overflow = 'auto';
		document.body.appendChild(cw_div);
	}
	else
	{
		// Hide DIV if it's visible
		if	(cw_div.style.display != 'none')
			cw_div.style.display = 'none';
	}
	CW_div_id = 'CW_DIV';
	var a = p_params.split(/\?/, 2);
	CW_AJAX_url = a[0];
	CW_AJAX_params = (a.length > 1)? a[1]: '';
	CW_AJAX_params2 = '';
}

function CW__DivMoveCursor (p_event)
{
	if	(!CW_timer_on)	return;
	CW_DivPosition(p_event, CW_div_id, 10, 10);
}

function CW_TimerOff ()
{
	if	(CW_timer_on)
		clearTimeout(CW_timer_id);
	if	(CW_div_visible)
	{
		CW_DivHide (CW_div_id);
		CW_div_visible = 0;
	}
	CW_timer_on = 0;
}

function CW_DivTimer ()
{
	var pw_div = document.getElementById(CW_div_id);
	if	(pw_div == null)
	{
		CW_timer_on = 0;
		return;
	}

	if	(CW_AJAX_url != '')
	{
		var params = CW_AJAX_params;
		if	(CW_AJAX_params2 != '')
		{
			if	(params != '')	params += '&';
			params += CW_AJAX_params2;
		}
		new Ajax.Request(CW_AJAX_url,
		{
			method: 'get',
			parameters: params,
			onSuccess: function(transport)
			{
				var text = transport.responseText || '';
				if (text != '')
				{
					var pw_div = document.getElementById(CW_div_id);
					pw_div.innerHTML = text;
					CW_DivMakeVisible(CW_div_id);
					CW_div_visible = 1;
				}
			}
		});
	}
	else
	{
		if	(CW_div_w)
			pw_div.style.width = CW_div_w;
		if	(CW_div_h)
			pw_div.style.height = CW_div_h;
		pw_div.innerHTML = CW_AJAX_params + CW_AJAX_params2;
		CW_DivMakeVisible(CW_div_id);
		CW_div_visible = 1;
	}

	CW_timer_on = 0;
}

function	CW_CallAJAX (p_url)
{

	var params = '';
	if	(p_url.match(/.\?./))
	{
		var a = p_url.split(/\?/,2);
		p_url = a[0];
		params = a[1];
		if	(params == null)	params = '';
		params = params.replace(/\%(\w+)\%/g, ReplaceActionString);
	}

	new Ajax.Request(p_url,
	{
		method: 'get',
		parameters: params,
		onSuccess: function(transport)
		{
			var text = transport.responseText || '';
			if	(text.match(/^ERROR:/))
				alert(text);
			else if (text != '')
			{
				var i, j, s, obj;
				var html_arr = text.split(/\~\~\~/);
				for (i = 0; i < html_arr.length; i += 2)
				{
					s = html_arr[i];
					s = s.replace(/\s+$/, '');
					if	(s.match(/^DIV\s+\w+$/))
					{
						s = s.replace(/^DIV\s+/, '');
						obj = document.getElementById(s);
						if	(obj != null)
							obj.innerHTML = (html_arr[i + 1] == null)? '': ' ' + html_arr[i + 1];
					}
					// Set values for blank form fields if necessary
					else if (s == 'SET')
					{
						var kv;
						var js_arr = html_arr[i + 1].split(/\s*\n\s*/);
						for (j = 0; j < js_arr.length; j++)
						{
							if	(!js_arr[j].match(/=/))	continue;
							kv = js_arr[j].split(/\s*=\s*/);
							if	(kv[1] == '')	continue;
							if	(kv[1] == undefined)	continue;
							obj = document.getElementById(kv[0]);
							if	((obj != null)&&(obj.value == ''))
							{
								obj.value = kv[1];
								if	(obj.onchange)
								{
									try { obj.onchange() } catch(err) { };
								}
							}
						}
					}
					else
					{
						alert("Unrecognized command '" + s + "'");
					}
				}
			}
		}
	});

	return false;
}

function	ScrollIntoView (p_obj)
{

	var parent = p_obj.parentNode;
	if	(parent == null)	return;
	var pch = parent.clientHeight;
	if	(pch < parent.scrollHeight)
	{
		var y = p_obj.offsetTop - ((pch - p_obj.clientHeight) / 2);
		parent.scrollTop = (y >= 0)? y: 0;
	}
	if ((parent.parent)&&(p_obj.nodeType != 'BODY'))
		ScrollIntoView(parent);
}

if	(window.onload)
	window.onload_CW_div_saved = window.onload;
window.onload = CW_DivOnload;

/*	Prototype JavaScript framework, version 1.4.0_pre10_ajax
 *	(c) 2005 Sam Stephenson <sam@conio.net>
 *
 *	This is a downcut version for AJAX by Alexander Kirk http://alexander.kirk.at/
 *
 *	Prototype is freely distributable under the terms of an MIT-style license.
 *
 *	For details, see the Prototype web site: http://prototype.conio.net/
 *
/*--------------------------------------------------------------------------*/

var Prototype = {
	Version: '1.4.0_pre10_ajax',
	
	emptyFunction: function() {},
	K: function(x) {return x}
}

var Class = {
	create: function() {
		return function() { 
			this.initialize.apply(this, arguments);
		}
	}
}

var Abstract = new Object();

Object.extend = function(destination, source) {
	for (property in source) {
		destination[property] = source[property];
	}
	return destination;
}

Object.inspect = function(object) {
	try {
		if (object == undefined) return 'undefined';
		if (object == null) return 'null';
		return object.inspect ? object.inspect() : object.toString();
	} catch (e) {
		if (e instanceof RangeError) return '...';
		throw e;
	}
}

Function.prototype.bind = function(object) {
	var __method = this;
	return function() {
		return __method.apply(object, arguments);
	}
}

Function.prototype.bindAsEventListener = function(object) {
	var __method = this;
	return function(event) {
		return __method.call(object, event || window.event);
	}
}

Object.extend(Number.prototype, {
	toColorPart: function() {
		var digits = this.toString(16);
		if (this < 16) return '0' + digits;
		return digits;
	},

	succ: function() {
		return this + 1;
	},
	
	times: function(iterator) {
		$R(0, this, true).each(iterator);
		return this;
	}
});

var Try = {
	these: function() {
		var returnValue;

		for (var i = 0; i < arguments.length; i++) {
			var lambda = arguments[i];
			try {
				returnValue = lambda();
				break;
			} catch (e) {}
		}

		return returnValue;
	}
}

/*--------------------------------------------------------------------------*/

var PeriodicalExecuter = Class.create();
PeriodicalExecuter.prototype = {
	initialize: function(callback, frequency) {
		this.callback = callback;
		this.frequency = frequency;
		this.currentlyExecuting = false;

		this.registerCallback();
	},

	registerCallback: function() {
		setInterval(this.onTimerEvent.bind(this), this.frequency * 1000);
	},

	onTimerEvent: function() {
		if (!this.currentlyExecuting) {
			try { 
				this.currentlyExecuting = true;
				this.callback(); 
			} finally { 
				this.currentlyExecuting = false;
			}
		}
	}
}

/*--------------------------------------------------------------------------*/

function $() {
	var elements = new Array();

	for (var i = 0; i < arguments.length; i++) {
		var element = arguments[i];
		if (typeof element == 'string')
			element = document.getElementById(element);

		if (arguments.length == 1) 
			return element;

		elements.push(element);
	}

	return elements;
}



var Ajax = {
	getTransport: function() {
		return Try.these(
			function() {return new ActiveXObject('Msxml2.XMLHTTP')},
			function() {return new ActiveXObject('Microsoft.XMLHTTP')},
			function() {return new XMLHttpRequest()}
		) || false;
	}
}

Ajax.Base = function() {};
Ajax.Base.prototype = {
	setOptions: function(options) {
		this.options = {
			method:			 'post',
			asynchronous: true,
			parameters:	 ''
		}
		Object.extend(this.options, options || {});
	},

	responseIsSuccess: function() {
		return this.transport.status == undefined
				|| this.transport.status == 0 
				|| (this.transport.status >= 200 && this.transport.status < 300);
	},

	responseIsFailure: function() {
		return !this.responseIsSuccess();
	}
}

Ajax.Request = Class.create();
Ajax.Request.Events = 
	['Uninitialized', 'Loading', 'Loaded', 'Interactive', 'Complete'];

Ajax.Request.prototype = Object.extend(new Ajax.Base(), {
	initialize: function(url, options) {
		this.transport = Ajax.getTransport();
		this.setOptions(options);
		this.request(url);
	},

	request: function(url) {
		var parameters = this.options.parameters || '';
		if (parameters.length > 0) parameters += '&_=';

		try {
			if (this.options.method == 'get')
				url += '?' + parameters;

			this.transport.open(this.options.method, url,
				this.options.asynchronous);

			if (this.options.asynchronous) {
				this.transport.onreadystatechange = this.onStateChange.bind(this);
				setTimeout((function() {this.respondToReadyState(1)}).bind(this), 10);
			}

			this.setRequestHeaders();

			var body = this.options.postBody ? this.options.postBody : parameters;
			this.transport.send(this.options.method == 'post' ? body : null);

		} catch (e) {
		}
	},

	setRequestHeaders: function() {
		var requestHeaders = 
			['X-Requested-With', 'XMLHttpRequest',
			 'X-Prototype-Version', Prototype.Version];

		if (this.options.method == 'post') {
			requestHeaders.push('Content-type', 
				'application/x-www-form-urlencoded');

			/* Force "Connection: close" for Mozilla browsers to work around
			 * a bug where XMLHttpReqeuest sends an incorrect Content-length
			 * header. See Mozilla Bugzilla #246651. 
			 */
			if (this.transport.overrideMimeType)
				requestHeaders.push('Connection', 'close');
		}

		if (this.options.requestHeaders)
			requestHeaders.push.apply(requestHeaders, this.options.requestHeaders);

		for (var i = 0; i < requestHeaders.length; i += 2)
			this.transport.setRequestHeader(requestHeaders[i], requestHeaders[i+1]);
	},

	onStateChange: function() {
		var readyState = this.transport.readyState;
		if (readyState != 1)
			this.respondToReadyState(this.transport.readyState);
	},
	
	evalJSON: function() {
		try {
			var json = this.transport.getResponseHeader('X-JSON'), object;
			object = eval(json);
			return object;
		} catch (e) {
		}
	},

	respondToReadyState: function(readyState) {
		var event = Ajax.Request.Events[readyState];
		var transport = this.transport, json = this.evalJSON();

		if (event == 'Complete')
			(this.options['on' + this.transport.status]
			 || this.options['on' + (this.responseIsSuccess() ? 'Success' : 'Failure')]
			 || Prototype.emptyFunction)(transport, json);

		(this.options['on' + event] || Prototype.emptyFunction)(transport, json);

		/* Avoid memory leak in MSIE: clean up the oncomplete event handler */
		if (event == 'Complete')
			this.transport.onreadystatechange = Prototype.emptyFunction;
	}
});

Ajax.Updater = Class.create();
Ajax.Updater.ScriptFragment = '(?:<script.*?>)((\n|.)*?)(?:<\/script>)';

Object.extend(Object.extend(Ajax.Updater.prototype, Ajax.Request.prototype), {
	initialize: function(container, url, options) {
		this.containers = {
			success: container.success ? $(container.success) : $(container),
			failure: container.failure ? $(container.failure) :
				(container.success ? null : $(container))
		}

		this.transport = Ajax.getTransport();
		this.setOptions(options);

		var onComplete = this.options.onComplete || Prototype.emptyFunction;
		this.options.onComplete = (function(transport, object) {
			this.updateContent();
			onComplete(transport, object);
		}).bind(this);

		this.request(url);
	},

	updateContent: function() {
		var receiver = this.responseIsSuccess() ?
			this.containers.success : this.containers.failure;

		var match		= new RegExp(Ajax.Updater.ScriptFragment, 'img');
		var response = this.transport.responseText.replace(match, '');
		var scripts	= this.transport.responseText.match(match);

		if (receiver) {
			if (this.options.insertion) {
				new this.options.insertion(receiver, response);
			} else {
				receiver.innerHTML = response;
			}
		}

		if (this.responseIsSuccess()) {
			if (this.onComplete)
				setTimeout(this.onComplete.bind(this), 10);
		}

		if (this.options.evalScripts && scripts) {
			match = new RegExp(Ajax.Updater.ScriptFragment, 'im');
			setTimeout((function() {
				for (var i = 0; i < scripts.length; i++)
					eval(scripts[i].match(match)[1]);
			}).bind(this), 10);
		}
	}
});

Ajax.PeriodicalUpdater = Class.create();
Ajax.PeriodicalUpdater.prototype = Object.extend(new Ajax.Base(), {
	initialize: function(container, url, options) {
		this.setOptions(options);
		this.onComplete = this.options.onComplete;

		this.frequency = (this.options.frequency || 2);
		this.decay = 1;

		this.updater = {};
		this.container = container;
		this.url = url;

		this.start();
	},

	start: function() {
		this.options.onComplete = this.updateComplete.bind(this);
		this.onTimerEvent();
	},

	stop: function() {
		this.updater.onComplete = undefined;
		clearTimeout(this.timer);
		(this.onComplete || Ajax.emptyFunction).apply(this, arguments);
	},

	updateComplete: function(request) {
		if (this.options.decay) {
			this.decay = (request.responseText == this.lastText ? 
				this.decay * this.options.decay : 1);

			this.lastText = request.responseText;
		}
		this.timer = setTimeout(this.onTimerEvent.bind(this), 
			this.decay * this.frequency * 1000);
	},

	onTimerEvent: function() {
		this.updater = new Ajax.Updater(this.container, this.url, this.options);
	}
});

// cpu_world_as.js
//
// AutoSuggest code
//
var AS_in_object;
var AS_min_chars = 3;
var AS_active = 0;
var AS_color;
var AS_color_set = 0;
var AS_action;
var AS_in_field;
var AS_onkeydown;
var AS_onmousedown
var AS_autocomplete;
var AS_choice = -1;
var AS_first_time = new Object();
var AS_set_value;
var AS_copy_value;
var AS_list_prefix;

function	AS_Focus (p_object, p_action, p_delay, p_min, p_set, p_list)
{

	if	(!p_object.id)
	{
		//	See if any other object in the document has this id
		var obj = document.getElementById(p_object.name);
		//	Object with this id already exists - can't do anything
		if	(obj != null)
		{
			alert("Field '" + p_object.name + "' doesn't have an id.\nAutoSuggest will not work for this field");
			return;
		}
		//	Since there is no other object with the same id - assign
		//	id to the object
		p_object.id = p_object.name;
	}
	AS_action = p_action;
	if	(p_delay == null)	p_delay = 200;
	Watching_Start(null, p_object, AS_SendRequest, p_delay);

	//	Save all data
	AS_in_object = p_object;
	AS_min_chars = ((p_min != null)? p_min: 3);
	AS_active = 1;
	AS_color = p_object.style.color;
	AS_onkeydown = p_object.onkeydown;
	AS_onmousedown = document.onmousedown;
	AS_autocomplete = p_object.autocomplete;
	AS_choice = -1;
	AS_set_value = p_set;
	AS_list_prefix = p_list;
	p_object.onkeydown = AS_InputKey;
	document.onmousedown = AS_DocMouse;
	p_object.autocomplete = 'off';

	var id = p_object.id;
	if	((!AS_first_time[id])&&(AS_min_chars == 0))
	{
		AS_first_time[id] = 1;
		AS_SendRequest (p_object.id, p_object.value, 1);
	}
}

function	AS_SendRequest (p_id, p_value, p_force)
{

	var len = p_value.length;
	if	((AS_min_chars > 0)&&
		 ((len < 1)||((len < AS_min_chars)&&(p_force == null))))
	{
		var div_obj = document.getElementById ('AutoSuggest');
		if	((div_obj != null)&&(div_obj.style.display != 'none'))
			div_obj.style.display = 'none';
		return;
	}

	AS_in_field = p_id;
	if	(typeof AS_action == 'function')
	{
		var arr = AS_action (p_id, p_value);
		if	(typeof arr == 'string')
			alert(arr);
		else
			AS_Process(arr);
	}
	else if	(typeof AS_action == 'string')
	{
		var a = AS_action.split(/\?/);
		var url, params;
		if	(a == null)
		{
			url = AS_action;
			params = '';
		}
		else
		{
			url = a[0];
			params = a[1];
			if	(params == null)	params = '';
			p_value = encodeURIComponent(p_value);
			params = params.replace(/\%_VALUE%/g, p_value);
			p_id = encodeURIComponent(p_id);
			params = params.replace(/\%_ID%/g, p_id);

			params = params.replace(/\%(\w+)\%/g, ReplaceActionString);
		}

		new Ajax.Request(url,
		{
			method: 'get',
			parameters: params,
			onSuccess: AS_Callback
		});
	}
	else if (typeof AS_action == 'object')
	{
		var a = new Array ();
		var len = AS_action.length;
		var i;
		for (i = 0; i < len; i++)
		{
			if	(AS_action[i].indexOf(p_value) != -1)
				a.push (AS_action[i]);
		}
		AS_Process(a);
	}
}

function	AS_Callback (p_transport)
{

	//	Don't do anything if AutoSuggest feature is not active
	if	(!AS_active)		return;

	var div_obj = document.getElementById ('AutoSuggest');

	//	Check for error
	text = p_transport.responseText;
	if	(text.match (/^ERROR:/))
	{
		if	(div_obj != null)
			div_obj.style.display = 'none';
		alert(text);
		return;
	}

	//	Get TEXT field name
	var a = text.split (/\s*\n/);
	var field = a.shift();
	field = field.replace(/^INFO:\s*/, '');
	//	Process the response only if field id matches with field id
	//	we're currently working with
	if	(field != AS_in_field)	return;
	if	((a[0] != null)&&(a[0].match (/^ERROR:/)))
	{
		if	(div_obj != null)
			div_obj.style.display = 'none';
		alert(a.join("\n"));
		return;
	}

	AS_Process(a);
}

function	AS_Process (p_data)
{

	var field_obj = document.getElementById (AS_in_field);
	if	(field_obj == null)
	{
		alert ("Cannot find TEXT field with id '" + AS_in_field + "'!");
		return;
	}

	//	Create div with select box if necessary
	var div_obj = document.getElementById ('AutoSuggest');
	if	(div_obj == null)
	{
		div_obj = document.createElement ('div');
		div_obj.id = 'AutoSuggest';
		div_obj.className = 'AutoSuggest';
		div_obj.zIndex = 20;
		div_obj.style.position = 'absolute';
		div_obj.style.display = 'none';
		div_obj.style.height = 'auto';
		div_obj.style.overflow = 'auto';
		document.body.appendChild(div_obj);
	}
	div_obj.style.width = field_obj.offsetWidth + 'px';
	div_obj.style.minWidth = field_obj.offsetWidth + 'px';

	//	Update content of the AutoSuggest DIV object
	var len = p_data.length;
	var html = new Array ();
	var i, j, s, v, bg;
	for (i = 0, j = 0, bg = 1; i < len; i++)
	{
		if	(p_data[i] == '')	continue;
		s = p_data[i];
		if	(s == '---~~~')
		{
			s = "<hr class='AutoSuggestSeparator'>";
			v = null;
			bg = 0;
		}
		else if (s.search(/^(error|warning|info|note):~~~(.*)$/) != -1)
		{
			s = "<div class='" + RegExp.$1 + "s'>" + RegExp.$2 + "</div>";
			v = null;
			bg = 0;
		}
		else if	(s.search(/^(.*)~~~(.*)$/) != -1)
		{
			s = RegExp.$1;
			v = RegExp.$2;
		}
		else
			v = s;

		if	(v == null)
			html.push("<div class='AutoSuggestChoiceX'>" + s + "</div>");
		else
		{
			html.push("<div class='AutoSuggestChoice" + ((bg == 2)? '2': '') +
				"' onMouseOver='AS_MOver(this,1," + j +
				")' onFocus='AS_MOver(this,1," + j +
				")' onMouseOut='AS_MOver(this,0," + j +
				")' onBlur='AS_MOver(this,0," + j +
				")' onClick='return AS_CopyValue(\"" + escape(v) + "\")'>" + s + "</div>");
		}
		if	(AS_list_prefix)	bg = (bg == 1)? 2: 1;
		j++;
	}
	if	(html.length == 0)
	{
		div_obj.style.display = 'none';
		AS_in_object.style.color = '#C00000';
		AS_color_set = 1;
		return;
//		html.push ("<div class='AutoSuggestNone' onClick='AS_CopyValue()'>No matches found</div>");
	}
	if	((html.length == 1)&&(s == AS_in_object.value))
	{
		div_obj.style.display = 'none';
		AS_in_object.style.color = '#00C000';
		AS_color_set = 1;
		return;
//		html.push ("<div class='AutoSuggestNone' onClick='AS_CopyValue()'>No matches found</div>");
	}
	if	(AS_color_set)
	{
		AS_in_object.style.color = AS_color;
		AS_color_set = 0;
	}

	div_obj.innerHTML = html.join("\n");
	//	Determine text field's position
	var x = field_obj.offsetLeft;
	var y = field_obj.offsetTop + field_obj.offsetHeight;
	var parent = field_obj.offsetParent;
	while (parent != null)
	{
		x += parent.offsetLeft;
		y += parent.offsetTop;
		parent = parent.offsetParent;
	}
	div_obj.style.height = null;
	//	Make div visible
	div_obj.style.display = 'block';
	CW_DivPosition (null, 'AutoSuggest', x, y, 2);
}

// p_focus: 0 - hide, 1 - show (no scrolling), 2 - show (scroll into view)
function AS_MOver(p_obj, p_focus, p_n)
{

	var class_name;
	if	((AS_choice >= 0)&&(p_n != AS_choice))
	{
		var div_obj = document.getElementById ('AutoSuggest');
		if	(div_obj != null)
		{
			var divs = div_obj.getElementsByTagName('DIV');
			if	((divs != null)&&(AS_choice < divs.length))
			{
				class_name = divs[AS_choice].className;
				divs[AS_choice].className =
					class_name.replace(/^AutoSuggestSelected/, "AutoSuggestChoice");
			}
			AS_choice = -1;
		}
	}

	class_name = p_obj.className;
	if	(p_focus)
	{
		p_obj.className =
			class_name.replace(/^AutoSuggestChoice/, "AutoSuggestSelected");
		if	(p_focus == 2)
			ScrollIntoView (p_obj);
		AS_choice = p_n;
	}
	else
	{
		p_obj.className =
			class_name.replace(/^AutoSuggestSelected/, "AutoSuggestChoice");
		AS_choice = -1;
	}
}

function	AS_InputKey (p_event)
{
	//	If there was an active onkeydown handler - invoke it
	if	(AS_onkeydown != null)
		AS_onkeydown (p_event);

	if	(AS_choice >= 0)
	{
		AS_AKey (p_event, AS_choice);
		if	(!p_event)	p_event = window.event;
		if	(p_event)
		{
			p_event.cancelBubble = true;
			if	(p_event.stopPropagation)
				p_event.stopPropagation();
		}

		return false;
	}

	if	(AS_color_set)
	{
		AS_in_object.style.color = AS_color;
		AS_color_set = 0;
	}
	var div_obj = document.getElementById ('AutoSuggest');
	if	(!p_event)
		p_event = window.event;
//	var code = p_event.charCode || p_event.keyCode;
	var code = p_event.keyCode;
	if	(code != 40)
	{
		//	Hide AutoSuggest div if it's open
		if	((div_obj != null)&&(div_obj.style.display != 'none'))
			div_obj.style.display = 'none';
		AS_choice = -1;
		return;
	}

	//	It's a key down event. If the AutoSuggest div is displayed
	if	((div_obj != null)&&(div_obj.style.display != 'none'))
	{
		AS_SelectDiv (0);
	}
	else
	{
		//	Don't send request for the same string more than once
		Watching_ResetTimer ();
		//	Call autosuggest script
		AS_SendRequest (AS_in_object.id, AS_in_object.value, 1);
	}

	return;
}

function	AS_AKey (p_event, p_n)
{
	var div_obj = document.getElementById ('AutoSuggest');
	if	(div_obj == null)	return;
	if	(!p_event)	p_event = window.event;
//	var code = p_event.charCode || p_event.keyCode;
	var code = p_event.keyCode;
	//	Escape
	if	(code == 27)
	{
		AS_in_object.focus();
		//	Hide AutoSuggest div if it's open
		if	(div_obj.style.display != 'none')
			div_obj.style.display = 'none';
		AS_choice = -1;
		return;
	}
	//	Up
	if	(code == 38)
	{
		//	Go back to the text field?
		if	(p_n == 0)
		{
			AS_in_object.focus();
			// Hide the div object
			if	(div_obj.style.display != 'none')
				div_obj.style.display = 'none';
			AS_choice = -1;
		}
		else
			AS_SelectDiv (p_n - 1);
		return;
	}
	//	Down
	if	(code == 40)
	{
		AS_SelectDiv (p_n + 1);
		return;
	}
	//	Right
	if	((code == 39)||(code == 13))
	{
		var divs = div_obj.getElementsByTagName('DIV');
		if	(divs == null)				return;
		if	(divs.length == 0)			return;
		if	(AS_choice >= divs.length)	return;
		if	((AS_choice >= 0)&&(divs[p_n].onclick))
			divs[p_n].onclick ();
		return;
	}
}

function	AS_SelectDiv (p_n)
{
	if	(p_n < 0)	return;
	var div_obj = document.getElementById ('AutoSuggest');
	if	(div_obj == null)	return;
	var divs = div_obj.getElementsByTagName('DIV');
	if	(divs == null)			return;
	if	(divs.length == 0)		return;
	if	(p_n >= divs.length)	return;
	AS_MOver(divs[p_n], 2, p_n);
}

function	AS_DocMouse (p_event)
{
	var e = p_event || window.event;
	//	If there was an active onmousedown handler - invoke it
	if	(AS_onmousedown != null)
		AS_onmousedown (p_event);

	//	Determine where the mouse was clicked
	var coords = new Object();
	CW_MouseXY (e, coords);
	var x = coords.x;
	var y = coords.y;

	var div_obj = document.getElementById ('AutoSuggest');
	if	(div_obj == null)	return;
	if	(div_obj.style.display == 'none')	return;
	var parent = div_obj;
//	var parent = div_obj.offsetParent;
	while ((parent != null)&&(parent.nodeName != 'BODY'))
	{
		x -= parent.offsetLeft;
		y -= parent.offsetTop;
		parent = parent.offsetParent;
	}
//alert(x + ' ' + div_obj.offsetLeft + ' ' + div_obj.offsetWidth + ' ' +
// y + ' ' + div_obj.offsetTop + ' ' + div_obj.offsetHeight);

	//	If the mouse was clicked outside of the AutoSuggest div
	//	then hide the AutoSuggest div
	if	((x < 0)||(x > div_obj.offsetWidth)||
		 (y < 0)||(y > div_obj.offsetHeight))
			div_obj.style.display = 'none';
}

function	AS_Blur (p_object)
{

	AS_active = 0;
	p_object.onkeydown = AS_onkeydown;
	document.onmousedown = AS_onmousedown;
	Watching_Stop(null, p_object);
	if	(AS_color_set)
	{
		AS_in_object.style.color = AS_color;
		AS_color_set = 0;
	}
	AS_in_object.autocomplete = AS_autocomplete;

	var div_obj = document.getElementById ('AutoSuggest');
	if	((div_obj != null)&&(div_obj.style.display != 'none'))
	{
		//	See if the user clicked within AutoSuggest DIV tag
//		if	(!CW_CheckObjectEvent (div_obj))
//			div_obj.style.display = 'none';
	}
}

function	AS_CopyValue (p_value)
{

	if	(p_value != null)
	{
		AS_choice = -1;
		p_value = unescape(p_value);
		// Old behavior - just set value
		if	((AS_set_value == null)||(AS_set_value == 'SET'))
		{
			//	Get TO object
			var to_obj = document.getElementById (AS_in_field);
			if	(to_obj == null)
				alert ("Object with id '" + AS_in_field + "' not found!");
			else
			{
				if	(to_obj.value != p_value)
				{
					to_obj.value = p_value;
					if	(to_obj.onchange)
					{
						try { to_obj.onchange() } catch(err) { };
					}
				}
				to_obj.focus();
			}
		}
		else if (AS_set_value == 'URL')
		{
			if	(p_value != '')
				window.location.href = p_value;
		}
		else if (AS_set_value.search(/^URL:\s*(.+)$/) != -1)
		{
			var url = RegExp.$1;
			AS_copy_value = p_value;
			url = url.replace(/\%([A-Za-z]\w*|)\%/g, AS_ReplaceActionString);
			window.location.href = url;
		}
		else if (AS_set_value.search(/^WINDOW:\s*(.+)$/) != -1)
		{
			var url = RegExp.$1;
			AS_copy_value = p_value;
			url = url.replace(/\%([A-Za-z]\w*|)\%/g, AS_ReplaceActionString);
			var as_win = open (url, 'AS_Window',
				'resizable=yes,scrollbars=yes');
			if (as_win.opener == null) as_win.opener = self;
		}
	}

	//	Hide the Autosuggest DIV object
	var div_obj = document.getElementById ('AutoSuggest');
	if	((div_obj != null)&&(div_obj.style.display != 'none'))
		div_obj.style.display = 'none';

	return false;
}

function	AS_ReplaceActionString (p_match, p_1)
{

	return encodeURIComponent((p_1 == '')?
		AS_copy_value: GetObjectValue (p_1));
}


function	Goto(p_url)
{
	window.location.href = p_url.replace(/\%(\w+)\%/g, Goto__Replace);
}

function	GotoW(p_url)
{
	var url = p_url.replace(/\%(\w+)\%/g, ReplaceActionString);
//	var w = open (url, 'GOTO_Window', 'resizable=yes,scrollbars=yes');
	var w = open (url, '', 'resizable=yes,scrollbars=yes');
	if (w.opener == null) w.opener = self;
}

function	Goto__Replace (p_match, p_1)
{
	return GetObjectValue (p_1);
}

function	GetObjectValue (p_field, p_sep)
{

	var obj = p_field;
	if	(obj == null)	return null;

	if	(typeof (obj) == 'string')
	{
		if	(obj == '')	return null;
		
		obj = document.getElementById (obj);
		if	(obj == null)
		{
			alert ('Internal error: Cannot find object with id "' + p_field + '"!');
			return '';
		}
	}

	var	type = obj.type;
	if	(type == null)	type = obj[0].type;

	var i, len;
	var s = '';
	if	(p_sep == null)		p_sep = ',';
	if	((type == 'checkbox')||(type == 'radio'))
	{
		if	(obj.length)
		{
			len = obj.length;
			for (i = 0; i < len; i++)
			{
				if	(obj[i].checked)
				{
					if	(s != '')
						s += p_sep;
					s += obj[i].value;
				}
			}
		}
		else
			s = (obj.checked)? obj.value: '';
	}
	else if ((type == 'select-one')||(type == 'select-multiple'))
	{
		len = obj.length;
		for (i = 0; i < len; i++)
		{
			if	(obj.options[i].selected)
			{
				if	(s != '')
					s += p_sep;
				s += obj.options[i].value;
			}
		}
	}
	else
	{
		s = obj.value;
	}

	return s;
}

var PDM_object_id;
var PDM_action;
var PDM_choice;
var PDM_delay;
var PDM_set_value;
var PDM_onmousedown;
var	PDM_data_cache = new Object();
var PDM_last_req;
var PDM_parent_class;
var PDM_onmousemove;
var PDM_mcoords = new Object;

function	PDM_Focus (p_object, p_action, p_delay, p_set)
{

	if	(!p_object.id)
	{
		alert("Field doesn't have an id.\nMenu will not work for this field");
		return;
	}

	var id = p_object.id;
	if	(PDM_object_id)
	{
		if	(PDM_object_id == id)	return;
		PDM_Blur ();
	}

	//	Save all data
	PDM_object_id = p_object.id;
	PDM_action = p_action;
	PDM_delay = p_delay;
	PDM_choice = -1;
	PDM_set_value = p_set;
	PDM_last_req = 0;
	PDM_onmousedown = document.onmousedown;
	PDM_parent_class = p_object.className;
	document.onmousedown = PDM_DocMouse;

	if	(PDM_data_cache[id])
		PDM_Process(0, 0, PDM_data_cache[id]);
	else
		PDM_last_req = InvokeAction (p_action, PDM_Process);
}

function	PDM_Process (p_req_id, p_err, p_data)
{

	//	Don't do anything if Menu is not active
	if	(!PDM_object_id)		return;
	//	Don't process old requests
	if	(p_req_id != PDM_last_req)	return;
	PDM_last_req = 0;

	var div_obj = document.getElementById ('PDMenu');

	//	Print error if necessary
	if	(p_err)
	{
		if	(div_obj != null)
			div_obj.style.display = 'none';
		alert(p_data);
		return;
	}

	if	(!PDM_data_cache[PDM_object_id])
		PDM_data_cache[PDM_object_id] = p_data;

	var parent_obj = document.getElementById (PDM_object_id);
	if	(parent_obj == null)
	{
		alert ("Cannot find object with id '" + PDM_object_id + "'!");
		return;
	}
	parent_obj.className = (parent_obj.className)?
		parent_obj.className + ' PDMenuParent': 'PDMenuParent';

	//	Create div with select box if necessary
	if	(div_obj == null)
	{
		div_obj = document.createElement ('div');
		div_obj.id = 'PDMenu';
		div_obj.className = 'PDMenu';
		div_obj.zIndex = 10;
		div_obj.style.position = 'absolute';
		div_obj.style.display = 'none';
		div_obj.style.height = 'auto';
		div_obj.style.overflow = 'auto';
		document.body.appendChild(div_obj);
	}
//	div_obj.style.width = parent_obj.offsetWidth + 'px';
	div_obj.style.width = 'auto';
	div_obj.style.minWidth = parent_obj.offsetWidth + 'px';

	//	Update content of the PDMenu DIV object
	var len = p_data.length;
	var html = new Array ();
	var i, j, s, v;
	for (i = 0, j = 0; i < len; i++)
	{
		if	(p_data[i] == '')	continue;
		s = p_data[i];
		if	(s == '---~~~')
		{
			s = "<hr class='PDMenuSeparator'>";
			v = '';
		}
		else if	(s.search(/^(.*)~~~(.*)$/) != -1)
		{
			s = RegExp.$1;
			v = RegExp.$2;
		}
		else
			v = s;
		html.push("<div class='PDMenuChoice" +
			"' onMouseOver='PDM_MOver(this,1," + j +
			")' onFocus='PDM_MOver(this,1," + j +
			")' onMouseOut='PDM_MOver(this,0," + j +
			")' onBlur='PDM_MOver(this,0," + j +
			")' onClick='PDM_Blur(); return ParseValue(\"" + escape(v) + "\")'>" + s + "</div>");
		j++;
	}
	if	(html.length == 0)
		div_obj.innerHTML = "<span style='color: #C00000'>&lt;No data found&gt;</span>";
	else
		div_obj.innerHTML = html.join("\n");
	//	Determine text field's position
	var x = parent_obj.offsetLeft;
	var y = parent_obj.offsetTop;
	var parent = parent_obj.offsetParent;
	while (parent != null)
	{
		x += parent.offsetLeft;
		y += parent.offsetTop;
		parent = parent.offsetParent;
	}
	div_obj.style.height = null;
	PDM_mcoords.x1 = x - 10;
	PDM_mcoords.y1 = y - 10;
	y += parent_obj.offsetHeight;
	PDM_mcoords.x2 = x + parent_obj.offsetWidth + 10;
	PDM_mcoords.y2 = y + 3;
	//	Make div visible
	div_obj.style.display = 'block';
	CW_DivPosition (null, 'PDMenu', x, y + 3, 5);
	x = PDM_mcoords.x1 + div_obj.offsetWidth + 20;
	if	(x > PDM_mcoords.x2)	PDM_mcoords.x2 = x;
	PDM_mcoords.y2 += div_obj.offsetHeight + 10;
	PDM_onmousemove = document.onmousemove;
	document.onmousemove = PDM_MMove;
}

function	PDM_DocMouse (p_event)
{
	if	(!PDM_object_id)	return;

	var e = p_event || window.event;
	//	If there was an active onmousedown handler - invoke it
	if	(PDM_onmousedown != null)
		PDM_onmousedown (p_event);

	//	Determine where the mouse was clicked
	var coords = new Object();
	CW_MouseXY (e, coords);
	var x = coords.x;
	var y = coords.y;

	var div_obj = document.getElementById ('PDMenu');
	if	(div_obj == null)	return;
	if	(div_obj.style.display == 'none')	return;
	var parent = div_obj;
//	var parent = div_obj.offsetParent;
	while ((parent != null)&&(parent.nodeName != 'BODY'))
	{
		x -= parent.offsetLeft;
		y -= parent.offsetTop;
		parent = parent.offsetParent;
	}

	//	If the mouse was clicked outside of the AutoSuggest div
	//	then hide the AutoSuggest div
	if	((x < 0)||(x > div_obj.offsetWidth)||
		 (y < 0)||(y > div_obj.offsetHeight))
			PDM_Blur ();
}

function PDM_MOver(p_obj, p_focus, p_n)
{

	var class_name;
	if	((PDM_choice >= 0)&&(p_n != PDM_choice))
	{
		var div_obj = document.getElementById ('PDMenu');
		if	(div_obj != null)
		{
			var divs = div_obj.getElementsByTagName('DIV');
			if	((divs != null)&&(PDM_choice < divs.length))
			{
				class_name = divs[PDM_choice].className;
				divs[PDM_choice].className =
					class_name.replace(/^PDMenuSelected/, "PDMenuChoice");
			}
			PDM_choice = -1;
		}
	}

	class_name = p_obj.className;
	if	(p_focus)
	{
		p_obj.className = class_name.replace(/^PDMenuChoice/, "PDMenuSelected");
		if	(p_focus == 2)
			ScrollIntoView (p_obj);
		PDM_choice = p_n;
	}
	else
	{
		p_obj.className = class_name.replace(/^PDMenuSelected/, "PDMenuChoice");
		PDM_choice = -1;
	}
}

function	PDM_MMove (p_event)
{

	var e = p_event || window.event;
	CW_MouseXY (e, PDM_mcoords);
	var x = PDM_mcoords.x;
	var y = PDM_mcoords.y;
	if	((x < PDM_mcoords.x1)||(x > PDM_mcoords.x2)||
		 (y < PDM_mcoords.y1)||(y > PDM_mcoords.y2))
			PDM_Blur ();
}

function	PDM_Blur ()
{

	if	(!PDM_object_id)	return;

	var parent_obj = document.getElementById (PDM_object_id);
	PDM_object_id = 0;
	document.onmousedown = PDM_onmousedown;
	document.onmousemove = PDM_onmousemove;
	PDM_onmousemove = null;
	var div_obj = document.getElementById ('PDMenu');
	if	((div_obj != null)&&(div_obj.style.display != 'none'))
	{
		//	See if the user clicked within AutoSuggest DIV tag
//		if	(!CW_CheckObjectEvent (div_obj))
			div_obj.style.display = 'none';
	}

	if	(parent_obj != null)
		parent_obj.className = PDM_parent_class;
}

var CW_cb_id = 0;
var	CW_cb_cache = new Object();

function	InvokeAction (p_action, p_function)
{

	CW_cb_id++;

	if	(typeof p_action == 'function')
	{
		var arr = p_action ();
		p_function ((typeof arr == 'string')? 1: 0, arr);
	}
	else if	(typeof p_action == 'string')
	{
		var a = p_action.split(/\?/);
		var url, params;
		if	(a == null)
		{
			url = p_action;
			params = '';
		}
		else
		{
			url = a[0];
			params = a[1];
			if	(params == null)	params = '';
			params = params.replace(/\%([a-zA-Z]\w*)\%/g, ReplaceActionString);
		}

		if	(params.match(/\%_FIELD%/))
			params = params.replace(/\%_FIELD%/g, CW_cb_id);
		else
		{
			if	(params != '')	params += '&';
			params += 'FIELD=' + CW_cb_id;
		}

		CW_cb_cache[CW_cb_id] = p_function;

		new Ajax.Request(url,
		{
			method: 'get',
			parameters: params,
			onSuccess: CallbackAction
		});
	}
	else if (typeof p_action == 'object')
	{
		var a = new Array ();
		var len = p_action.length;
		var i;
		for (i = 0; i < len; i++)
		{
//			if	(p_action[i].indexOf(p_value) != -1)
				a.push (p_action[i]);
		}
		p_function(0, a);
	}

	return CW_cb_id;
}

function	ReplaceActionString (p_match, p_1)
{

	return encodeURIComponent(GetObjectValue (p_1));
}

function	CallbackAction (p_transport)
{

	//	Check for fatal error
	text = p_transport.responseText;
	if	(text.match (/^ERROR:/))
	{
		alert (text);
		return;
	}

	//	Get request id
	var a = text.split (/\s*\n/);
	var id = a.shift();
	id = id.replace(/^INFO:\s*/, '');
	//	Ignore request if we're not waiting for it
	if	(!CW_cb_cache[id])	return;

	var call_function = CW_cb_cache[id];
	CW_cb_cache[id] = null;
	var	err = 0;
	if	(a[0] != null)
	{
		if	(a[0].match (/^ERROR:/))
		{
			call_function (id, 1, a.join("\n"));
			return;
		}
		a[0] = a[0].replace(/^INFO:\s*/, '');
	}

	call_function (id, 0, a);
}

function	ParseValue (p_value)
{

	if	(p_value == null)	return false;

	p_value = unescape(p_value);
	// Old behavior - just set value
	if (p_value.search(/^SET\s+(\w+)\s+(.*)$/) != -1)
	{
		var field = RegExp.$1;
		var value = RegExp.$2;
		//	Get TO object
		var to_obj = document.getElementById (field);
		if	(to_obj == null)
			alert ("Object with id '" + AS_in_field + "' not found!");
		else
			to_obj.value = value;
	}
	else if (p_value.search(/^URL:\s*(.+)$/) != -1)
	{
		var url = RegExp.$1;
		url = url.replace(/\%(\w+)\%/g, ReplaceActionString);
		window.location.href = url;
	}
	else if (p_value.search(/^WINDOW:\s*(.+)$/) != -1)
	{
		var url = RegExp.$1;
		url = url.replace(/\%(\w+)\%/g, ReplaceActionString);
		var cw_win = open (url, 'CW_Window',
			'resizable=yes,scrollbars=yes');
		if (cw_win.opener == null) cw_win.opener = self;
	}
	else
	{
		alert ("Internal error in ParseValue: don't know how to handle value '" +
			p_value + "'");
	}

	return false;
}

function CReply (p_obj, p_on)
{

	var	id = p_obj.id;
	if	(id == null)	return;
	var a = id.split ('_');

	var r_id = 'C_R_' + a[3];
	var r_div = document.getElementById (r_id);
	if	(r_div == null)
	{
		r_div = document.createElement('DIV');
		r_div.setAttribute('id', 'C_R_' + a[3]);
		r_div.style.display = 'none';
		r_div.className = 'comment_hreply';
		r_div.innerHTML = "<input type='button' name='REPLY' value='Reply' class='comment_rbutton' onClick='window.location.href = \"/cgi-bin/AddComment.pl?PAGE_ID=" +
			a[2] + "&REPLY=" + a[3] + "&PROCESS=Post\"'>";
		p_obj.insertBefore(r_div, p_obj.firstChild);
	}
	r_div.style.display = (p_on)? 'block': 'none';
}

function CW_Error (p_err)
{
	if	(p_err)	alert (p_err);
	return false;
}

function AddToCompare (p_add)
{

	var cmp_div = document.getElementById ('CMP_CONTAINER');
	if	(cmp_div == null)	return;

	if	(CW_cookie_status == -1)
	{
		if	(p_add == '1')
			alert ('Comparison feature requires browser cookies.');
		return;
	}

	var s = GetCookie('CMP');
	var parts = (s == '')? new Array(): s.split(/\|/);
	var i, j;
	var len = parts.length;
	var	part = (typeof(CW_cmp_data) == 'undefined')? '': CW_cmp_data;
	var cmp_list = document.getElementById ('CMP_LIST');
	if	(part == '')
	{
		if	(len == 0)
		{
			if	(cmp_list != null)	cmp_list.style.display = 'none';
			return;
		}
		if	(cmp_list == null)
			cmp_div.innerHTML = "<div class='shdw'><div class='shdw2'><h4 class='side_h4a'>Compare CPUs</h4><div class='side_fbox'><div id='CMP_LIST' style='line-height: 140%; display: none'></div></div></div></div>";
	}
	else
	{
		var found = -1;
		for (i = 0; i < len; i++)
		{
			if	(parts[i] != part)	continue;
			found = i;
			break;
		}
		if	((p_add)&&(p_add == '1'))
		{
			if	(found < 0)
			{
				if	(len >= 10)
				{
					alert("Comparison tool currenty does not support more than 10 different parts");
					return;
				}
				parts.push (part);
				s = parts.join('|');
				SetCookie ('CMP', s, 1);
				found = len;
				len++;
			}
		}

		if	(cmp_list == null)
		{
			var html = new Array ("<div class='shdw'><div class='shdw2'>",
				"<h4 class='side_h4a'>Compare CPUs</h4>",
				"<div class='side_fbox'>",
				"<div id='CMP_ADD' style='text-align: center'><FORM ACTION=''><input type=BUTTON name=PROCESS value='Add to Compare' class='ibutton' onClick='AddToCompare(1)'></form></div>",
				"<div id='CMP_ADDED' class='info' style='text-align: center; padding: 5px; display: none'>Part added</div>",
				"<div id='CMP_LIST' style='background-image: url(http://cdn.cpu-world.com/Images/middle-dotted.gif); background-repeat: repeat-x; padding-top: 15px; line-height: 140%; display: none'></div>",
				"</div>",
				"</div></div>"
			);
			cmp_div.innerHTML = html.join("\n");
		}

		if	(found < 0)
			OnOff ("CMP_ADD", "", "CMP_ADDED");
		else
			OnOff ("CMP_ADDED", "", "CMP_ADD");
	}

	cmp_list = document.getElementById ('CMP_LIST');
	if	(len > 0)
	{
		if	(cmp_list == null)	return;
		var html = new Array("Currently selected:<p>");
		var lnk = new Array();
		var a = new Array ();
		var b = new Array ();
		for (i = 0; i < len; i++)
		{
			a = parts[i].split(/,/);
			j = a[3];
			if	(j == null)  j = '';
			s = (j == '')? '': " <sup style='color: #808080'>(*)</sup>";
			html.push ("<div><input type='button' onclick='DeleteCompare(\"" + parts[i] + "\")' class='del_cbutton' value='X'> &nbsp; " + a[0] + ' ' + a[2] + s + "</div>");
			lnk.push('PART' + (i + 1) + '=' + encodeURIComponent(a[0] + '_' + a[1]));
			if	(j != '')	b.push(j);
		}
		var blen = b.length;
		if	(blen > 0)
			html.push ("<div class='smaller' style='padding: 5px 0; color: #808080'>* - benchmarks are available</div>");

		if	(len > 1)
		{
			html.push ("<div style='padding: 10px 0 5px 0'><a href='/cgi-bin/CompareNParts.pl?" +
				lnk.join('&') + "'>Compare side by side</a></div>");
			if	(len == 2)
				html.push ("<div style='padding: 5px 0 5px 0'><a href='/cgi-bin/CompareParts.pl?" +
					lnk.join('&') + "'>Detailed comparison of 2 CPUs</a></div>");
			if	(blen > 1)
				html.push ("<div style='padding: 5px 0 5px 0'><a href='/benchmarks/?part=" +
					b.join('|') + "&CW=1'>Browse benchmarks</a></div>");
		}

		cmp_list.innerHTML = html.join("\n");
		cmp_list.style.display = (cmp_list.nodeName.match(/^(SPAN|TABLE|TBODY|TR)$/))? '': 'block';
	}
	else
		cmp_list.style.display = 'none';
}

function DeleteCompare (p_part)
{

	if	(CW_cookie_status == -1)	return;
	var s = GetCookie('CMP');
	if	(s == '')	return;
	var parts = s.split(/\|/);
	var len = parts.length;
	var i;
	for (i = 0; i < len; i++)
	{
		if	(parts[i] == p_part)
		{
			parts.splice (i, 1);
			s = parts.join('|');
			SetCookie ('CMP', s, 1);
			AddToCompare ();
			return;
		}
	}
}

SetOnload(AddToCompare);
