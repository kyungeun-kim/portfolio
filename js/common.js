$(function(){
	var $gnb = $(".gnb"),
		$mGnb = $(".m_gnb"),
		$sitemap = $(".sitemap"),
		$topBtn = $(".top_btn"),
		$contents = $(".contents"),
		$header = $(".header"),
		$gnbClone = $gnb.html(),
		mGnbReady = false,
		pageY,
		contentsFrontY; // 스크롤 시 gnb 고정을 위한 이벤트 발생 offset 값 설정.

	// m_gnb, sitemap 복사
	$mGnb.html($gnbClone);
	$sitemap.html($gnbClone);
	$mGnb.find(".sub_gnb").attr("class","m_sub_gnb");
	$mGnb.find(".sub2_gnb").attr("class","m_sub2_gnb");
	$sitemap.find(".sub_gnb").attr("class","sitemap_sub_gnb");
	$sitemap.find(".sub2_gnb").attr("class","sitemap_sub2_gnb");

	// gnb 오버 시
	$('.gnb > li, .gnb_bg').hover(function(){
		$(".sub_gnb").stop().fadeIn(300);
		$(".gnb_bg").stop().fadeIn(300);
	}, function(){
		$(".sub_gnb").stop().fadeOut(300);
		$(".gnb_bg").stop().fadeOut(300);
	});

	// sitemap 열기
	$(".sitemap_btn").click(function(){
		$("body").addClass("scroll_fixed");
		black_bg_over();
		$(".sitemap_wrap").stop().fadeIn(300);
	});

	// sitemap 닫기
	$(".sitemap_close").click(function(){
		$("body").removeClass("scroll_fixed");
		black_bg_leave();
		$(".sitemap_wrap").stop().fadeOut(300);
	});

	// m_gnb 열기
	$(".m_gnb_btn").click(function(e){
		$("body").addClass("scroll_fixed");
		mGnbReady = true;
		black_bg_over();
		$(".m_gnb_bg").show().animate({opacity:0.5}, 400);
		$(".m_gnb_wrap").show().animate({right:0}, 400, "easeOutQuint");
	});

	// m_gnb 메뉴 클릭 시
	$mGnb.find("> li > a").on("click",function(e){
		if(!$(this).hasClass("on")){
			$mGnb.find("> li > a").removeClass("on");
			$(this).addClass("on");
			$(".m_sub_gnb:visible").stop(true,true).slideUp();
			$(this).parent().find(".m_sub_gnb").stop(true,true).slideDown();
		}
		else{
			$(this).removeClass("on");
			$(this).parent().find(".m_sub_gnb").stop(true,true).slideUp();
		}
		return false;
	});

	// m_gnb 닫기
	$(".m_gnb_bg, .m_gnb_close").click(function(e){
		$("body").removeClass("scroll_fixed");
		mGnbClose();
		return false;
	});

	// mGnbClose function
	function mGnbClose(){
		$("body").removeClass("scroll_fixed");
		$(".m_gnb_bg").stop().animate({opacity:0}, 400, function(e){
			$(this).hide();
		});
		$(".m_gnb_wrap").stop().animate({right:-480}, 400, "easeOutQuint", function(e){
			$(this).hide();
			black_bg_leave();
		});
		mGnbReady = false;
	}
	
	// black_bg function
	function black_bg_over(){
		$("body").css({"overflow-y":"hidden"});
	}
	function black_bg_leave(){
		$("body").css({"overflow-y":"visible"});
	}


	// 스크롤 시
	$(window).scroll(function(){
		if($("body").hasClass("scroll_fixed")==false){
			pageY = window.pageYOffset;
			contentsFrontY = $contents.offset().top;
			if(pageY>=200){
				$topBtn.css({visibility:"visible"}).stop().animate({opacity:1}, 300);
			}
			else{
				$topBtn.stop().animate({opacity:0}, 300, function(){
					$(this).css({visibility:"hidden"});
				});
			}

			if(pageY>=contentsFrontY){
				$header.addClass("scrolled");
			}
			else{
				$header.removeClass("scrolled");
			}
		}
		else{}
	});
	$(window).scroll();


	// 반응형 시
	$(window).resize(function(){
		/* mGnb_control */
		windowW = window.innerWidth;
		if(windowW<991){
			$("body").removeClass("scroll_fixed");
			black_bg_leave();
			$(".sitemap_wrap").stop().fadeOut(300);
		}
		else{
			if(mGnbReady){
				mGnbClose();
			}
		}
	});
	$(window).trigger("resize");


	// top 버튼 클릭 시
	$(".top_btn, .foot_top_btn").click(function(){
		$("html,body").animate({scrollTop:0}, 300);
	});

	// share 버튼 클릭 시
	$(".share_btn").click(function(){
		$(".q_share_menu").stop().fadeToggle(300);
	});

	// 첨부파일 이벤트
	$(".attach_vinput").click(function(){
		$(this).parent().siblings(".attach_input").trigger("click");
	});
	$(".attach_input").on("change",function(){
		var attText = $(this).val();
		var attTextIndex = attText.lastIndexOf("\\") + 1;
		attText = attText.slice(attTextIndex);
		$(this).next().find(".attach_vinput").val(attText);
	});

	// 기본 탭 on, off
	var basicTabIndex;
	$(".basic_tab.onoff li a").click(function(){
		basicTabIndex = $(this).parent().index();
		$(this).parent().addClass("on").siblings().removeClass("on");
		$(this).parent().parent().siblings(".basic_tab_con_box").children().hide().eq(basicTabIndex).show();

		return false;
	});
});