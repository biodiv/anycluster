#!/usr/bin/perl --

use strict;
use warnings;

use Getopt::Std;

sub check_prereq{
	if( !`which gnuplot` ){
		die "gnuplot needs installed in \$PATH$/";
	}
	if( !`which psql` ){
		die "psql needs installed in \$PATH$/";
	}
}

sub usage{
	print STDERR <<_HELP;
Usage: $0 [-h] [-d dbname] [-k number]
	-h:	print this help
	-d:	database to connect
	-k:	number of class
_HELP
	0;
}

sub main{
	&check_prereq();
	my %opt;

	getopts('hd:k:', \%opt);

	if( $opt{'h'} ){
		return &usage;
	}
	my $dbname = $opt{'d'} || "db1";
	my $k = $opt{'k'} || 5;
	my $sql = <<_SQL;
SELECT kmeans(ARRAY[val1, val2], $k) OVER (), val1, val2
FROM testdata
ORDER BY 1
_SQL
	$sql = <<_SQL;
SELECT kmeans(ARRAY[longitude, latitude], 2, array[135.0, 35.0, 139.0, 38.0]) OVER (), longitude, latitude
FROM pref
WHERE latitude IS NOT NULL AND longitude IS NOT NULL
ORDER BY 1
_SQL
	print $sql . $/;
	open my $fh, "-|", qq(psql -A -F ' ' -t -c "$sql" $dbname) or die $!;
	open my $out, ">", "tmp.dat" or die $!;
	my $prev_k = 0;
	while( <$fh> ){
		chomp;
		my( $k, $v1, $v2 ) = split / /, $_;
		if( $k != $prev_k ){
			print $out "\n\n";
			$prev_k = $k;
		}
		print $out "$v1 $v2\n";
	}
	close $out;
	close $fh;

	my @buf;
	for my $i ( 0 .. $prev_k ){
		push @buf,  "\"tmp.dat\" index $i:$i using 1:2";
	}
	my $plotcmd = 'gnuplot -e \'plot ' . join( ", ", @buf ) . '; pause -1\'';
	print $plotcmd . $/;
	return `$plotcmd`;
}

if( $0 eq __FILE__ ){
	&main( @ARGV );
}

