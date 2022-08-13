<div class="box">
	<div class="box-head">
		<span class="box-title">
			<slot name="title"></slot>
		</span>
		<span class="box-right">
			<slot name="right"></slot>
		</span>
	</div>
	<div class="box-content">
		<slot></slot>
	</div>
</div>

<style>
	.box-head {
		padding: 0 0.5em;
	}
	.box-head::after {
		content: "";
		display: block;
		clear: both;
	}

	.box-title {
		float: left;
		vertical-align: middle;
	}
	.box-right {
		float: right;
		vertical-align: middle;
	}

	.box-content {
		padding: 0.5em;
	}
</style>