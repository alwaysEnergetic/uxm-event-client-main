const Footer = () => {
  var d = new Date();
	var year = d.getFullYear();
	return (
		<footer className=''>
			<div className="text-center">
				<div>
          {`Copyright © ${year} UXM Limited. All rights reserved.`}
				</div>
			</div>
		</footer>
	);
};

export default Footer
